"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { examplePrompts } from "@/lib/utils";
import Image from "next/image";

interface PromptRequest {
  prompt: string;
}

interface GreenGPTResponse {
  optimizedPrompt: string;
  optimizedAnswer: string;
  originalAnswer: string;
  isCached: boolean;
}

interface AnalyzePromptRequest {
  originalPrompt: string;
  optimizedPrompt: string;
  originalAnswer: string;
  optimizedAnswer: string;
}

interface AnalyzeResponse {
  energySavedWatts: number;
  similarityScoreCosine: number;
  similarityScoreGPT: number;
  originalTokens: number; // Add this line
  optimizedTokens: number;
}

const API_URL = "https://backend.tokenterminator.deploy.selectcode.dev";

const optimizePrompt = async (prompt: string): Promise<GreenGPTResponse> => {
  const response = await fetch(`${API_URL}/optimize-prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) throw new Error("Failed to optimize prompt");
  return response.json(); // Remove the mocking, use the actual response
};

const analyzePrompt = async (
  data: AnalyzePromptRequest
): Promise<AnalyzeResponse> => {
  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to analyze prompt");
  return response.json();
};

const getEnergySavedVisualization = (energySaved: number) => {
  // Scale up by 10000 for visualization
  const scaledEnergySaved = energySaved * 10000;
  const hoursWith6WBulb = scaledEnergySaved / 6; // 6W = 0.006kWh

  if (scaledEnergySaved === 0) {
    return { emoji: "⏳", text: "0 hours saved" };
  } else {
    return {
      emoji: "💡",
      text: `${hoursWith6WBulb.toFixed(1)} hours of a LED bulb`,
    };
  }
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [optimizationResponse, setOptimizationResponse] =
    useState<GreenGPTResponse | null>(null);
  const [analysisResponse, setAnalysisResponse] =
    useState<AnalyzeResponse | null>(null);
  const [showOptimized, setShowOptimized] = useState(true);
  const [showOptimizedAnswer, setShowOptimizedAnswer] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // New state variables for accumulative savings
  const [totalTokensSaved, setTotalTokensSaved] = useState(0);
  const [totalEnergySaved, setTotalEnergySaved] = useState(0);

  // Updated state for the advertisement modal and prompt count
  const [showAd, setShowAd] = useState(false);
  const [promptCount, setPromptCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAnalysisResponse(null);
    toast("Prompt submitted", {
      description: "Your prompt is being optimized.",
    });

    // Increment the prompt count
    const newPromptCount = promptCount + 1;
    setPromptCount(newPromptCount);

    // Show the ad if this is the third prompt submission
    if (newPromptCount === 3) {
      setShowAd(true);
    }

    try {
      const optimizationResult = await optimizePrompt(prompt);
      setOptimizationResponse(optimizationResult);
      setIsLoading(false);

      setIsAnalyzing(true);
      const analysisResult = await analyzePrompt({
        originalPrompt: prompt,
        optimizedPrompt: optimizationResult.optimizedPrompt,
        originalAnswer: optimizationResult.originalAnswer,
        optimizedAnswer: optimizationResult.optimizedAnswer,
      });
      setAnalysisResponse(analysisResult);

      // Update accumulative savings
      const tokensSaved =
        analysisResult.originalTokens - analysisResult.optimizedTokens;
      setTotalTokensSaved((prevTotal) => prevTotal + tokensSaved);
      setTotalEnergySaved(
        (prevTotal) => prevTotal + analysisResult.energySavedWatts
      );
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error", { description: "Failed to process the prompt." });
    } finally {
      setIsLoading(false);
      setIsAnalyzing(false);
    }
  };

  const handleExampleSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  const renderPrompt = () => {
    if (!showOptimized || !optimizationResponse) return prompt;

    const originalChars = prompt.split("");
    const optimizedChars = optimizationResponse.optimizedPrompt.split("");
    let optimizedIndex = 0;

    return originalChars.map((char, index) => {
      // If we have exhausted optimizedChars, mark remaining original chars as unmatched
      if (optimizedIndex >= optimizedChars.length) {
        return (
          <span key={index} className="bg-red-300">
            {char}
          </span>
        );
      }

      // If the current character in original matches the character in optimized, move ahead in both
      if (char === optimizedChars[optimizedIndex]) {
        optimizedIndex++; // Move to the next character in the optimized string
        return <span key={index}>{char}</span>;
      }

      // If there's a mismatch (i.e., char not in optimized at the current index), mark it as missing
      return (
        <span key={index} className="bg-red-300">
          {char}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Advertisement Modal */}
      <Dialog open={showAd} onOpenChange={setShowAd}>
        <DialogContent className="p-0 max-w-none w-auto h-auto">
          <Image
            src="/advertisement.png"
            alt="Advertisement"
            width={1500}
            height={900}
            objectFit="contain"
          />
        </DialogContent>
      </Dialog>

      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            <span className="text-5xl mr-2">✂️</span> TokenTerminator
          </h1>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[1400px] mx-auto py-6 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>📝 Enter your prompt</span>
                  <div className="flex items-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Example Prompts</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {examplePrompts.map((example, index) => (
                          <DropdownMenuItem
                            key={index}
                            onClick={() => handleExampleSelect(example.prompt)}
                          >
                            {example.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Switch
                      id="show-optimized"
                      checked={showOptimized}
                      onCheckedChange={setShowOptimized}
                    />
                    <Label htmlFor="show-optimized">🔍 Show Optimized</Label>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="prompt">Prompt</Label>
                      <div className="relative">
                        {!showOptimized || !optimizationResponse ? (
                          <Textarea
                            id="prompt"
                            placeholder="Enter your prompt here or select an example prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="h-48 font-mono text-sm resize-none"
                          />
                        ) : (
                          <div
                            className="h-48 font-mono text-sm rounded-md border border-input bg-transparent px-3 py-2 shadow-sm overflow-auto"
                            style={{
                              lineHeight: "1.5rem",
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                            }}
                          >
                            {renderPrompt()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="mt-4"
                    disabled={isLoading || isAnalyzing}
                  >
                    🚀 Submit
                  </Button>
                </form>
              </CardContent>
            </Card>

            {(optimizationResponse || isLoading) && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span>🤖 LLM Response</span>
                      {optimizationResponse?.isCached && ( // Changed from 'cached' to 'isCached'
                        <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-[#147B58] text-white">
                          Cached
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-optimized-answer"
                        checked={showOptimizedAnswer}
                        onCheckedChange={setShowOptimizedAnswer}
                      />
                      <Label htmlFor="show-optimized-answer">
                        🔍 Show Optimized
                      </Label>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">
                        {showOptimizedAnswer
                          ? "Optimized Answer:"
                          : "Original Answer:"}
                      </h3>
                      {isLoading ? (
                        <Skeleton className="h-32 w-full" />
                      ) : (
                        <Textarea
                          value={
                            showOptimizedAnswer
                              ? optimizationResponse?.optimizedAnswer
                              : optimizationResponse?.originalAnswer
                          }
                          readOnly
                          className="h-32 font-mono text-sm resize-none"
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>📊 Optimization Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* New section for tokens saved in this message */}
                  <div>
                    <h3 className="font-semibold">🎟️ Tokens Saved</h3>
                    {isAnalyzing ? (
                      <Skeleton className="h-4 w-20" />
                    ) : analysisResponse ? (
                      <p>
                        {analysisResponse.originalTokens -
                          analysisResponse.optimizedTokens}{" "}
                        (
                        {(
                          ((analysisResponse.originalTokens -
                            analysisResponse.optimizedTokens) /
                            analysisResponse.originalTokens) *
                          100
                        ).toFixed(2)}
                        %)
                      </p>
                    ) : (
                      <p>0 (0%)</p>
                    )}
                  </div>

                  {/* Existing total tokens saved section */}
                  <div>
                    <h3 className="font-semibold flex items-center">
                      🎟️ Tokens Saved (Total)
                      {optimizationResponse?.isCached && (
                        <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-[#147B58] text-white">
                          Cached
                        </span>
                      )}
                    </h3>
                    {isAnalyzing ? (
                      <Skeleton className="h-4 w-20" />
                    ) : (
                      <p>{totalTokensSaved}</p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">⚡ Energy Saved (Total)</h3>
                    {isAnalyzing ? (
                      <Skeleton className="h-4 w-24" />
                    ) : (
                      <p>{totalEnergySaved.toFixed(4)} Wh</p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      🎯 Similarity Score (Cosine)
                    </h3>
                    {isAnalyzing ? (
                      <Skeleton className="h-4 w-16" />
                    ) : (
                      <p>
                        {(
                          (analysisResponse?.similarityScoreCosine || 0) * 100
                        ).toFixed(2)}
                        %
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">🎯 Similarity Score (GPT)</h3>
                    {isAnalyzing ? (
                      <Skeleton className="h-4 w-16" />
                    ) : (
                      <p>
                        {(
                          (analysisResponse?.similarityScoreGPT || 0) * 100
                        ).toFixed(2)}
                        %
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      👥 Scaled for 10000 Prompts
                    </h3>
                    {isAnalyzing ? (
                      <>
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-4 w-36" />
                      </>
                    ) : (
                      <>
                        <p>Tokens saved: {totalTokensSaved * 10000}</p>
                        <p>
                          Energy: {(totalEnergySaved * 10000).toFixed(2)} Wh
                        </p>
                      </>
                    )}
                  </div>

                  {/* Energy Saved Visualization */}
                  <div className="flex flex-col items-center justify-center mt-4 space-y-2">
                    <span className="text-6xl">
                      {isAnalyzing
                        ? "⏳"
                        : getEnergySavedVisualization(totalEnergySaved).emoji}
                    </span>
                    {isAnalyzing ? (
                      <Skeleton className="h-4 w-32" />
                    ) : (
                      <span className="text-center">
                        {getEnergySavedVisualization(totalEnergySaved).text}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-[#147B58] text-white py-4 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Boston_Consulting_Group_2020_logo.svg"
                alt="Boston Consulting Group Logo"
                width={100}
                height={50}
                objectFit="contain"
              />
              <span className="font-semibold">Boston Consulting Group</span>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} Boston Consulting Group. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}
