"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

// Define types based on the OpenAPI schema
interface PromptRequest {
  prompt: string;
}

interface GreenGPTResponse {
  optimizedPrompt: string;
  optimizedAnswer: string;
  originalAnswer: string;
  savedEnergy: number;
  similarityScore: number;
  optimizedTokens: number;
}

// Function to call the backend API
const optimizePrompt = async (prompt: string): Promise<GreenGPTResponse> => {
  const response = await fetch(
    "https://backend.tokenterminator.deploy.selectcode.dev/optimize-prompt",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to optimize prompt");
  }

  return response.json();
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<GreenGPTResponse | null>(null);
  const [showOptimized, setShowOptimized] = useState(false);
  const [showOptimizedAnswer, setShowOptimizedAnswer] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast("Prompt submitted", {
      description: "Your prompt is being optimized.",
    });

    try {
      const result = await optimizePrompt(prompt);
      setResponse(result);
    } catch (error) {
      console.error("Error calling API:", error);
      toast.error("Error", {
        description: "Failed to optimize the prompt.",
      });
    }
  };

  const renderPrompt = () => {
    if (!showOptimized || !response) return prompt;

    const originalWords = prompt.split(/\s+/);
    const optimizedWords = response.optimizedPrompt.split(/\s+/);
    return originalWords.map((word, index) => (
      <span
        key={index}
        className={!optimizedWords.includes(word) ? "bg-red-300" : ""}
      >
        {word}{" "}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            <span className="text-5xl mr-2">✂️</span> TokenTerminator
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          <div className="w-2/3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>📝 Enter your prompt</span>
                  <div className="flex items-center space-x-2">
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
                        {!showOptimized || !response ? (
                          <Textarea
                            id="prompt"
                            placeholder="Enter your prompt here"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="h-32 font-mono text-sm resize-none"
                          />
                        ) : (
                          <div
                            className="h-32 font-mono text-sm rounded-md border border-input bg-transparent px-3 py-2 shadow-sm overflow-auto"
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
                  <Button type="submit" className="mt-4">
                    🚀 Submit
                  </Button>
                </form>
              </CardContent>
            </Card>

            {response && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>🤖 LLM Response</span>
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
                      <Textarea
                        value={
                          showOptimizedAnswer
                            ? response.optimizedAnswer
                            : response.originalAnswer
                        }
                        readOnly
                        className="h-32 font-mono text-sm resize-none"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="w-1/3">
            {response && (
              <Card>
                <CardHeader>
                  <CardTitle>📊 Optimization Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">🎟️ Tokens Saved</h3>
                      <p>{response.optimizedTokens}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">⚡ Energy Saved</h3>
                      <p>{response.savedEnergy.toFixed(4)} Wh</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">🎯 Similarity Score</h3>
                      <p>{(response.similarityScore * 100).toFixed(2)}%</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">👥 Scaled for 100 Users</h3>
                      <p>Tokens: {response.optimizedTokens * 100}</p>
                      <p>
                        Energy: {(response.savedEnergy * 100).toFixed(2)} Wh
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Toaster />
    </div>
  );
}
