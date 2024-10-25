"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

// List of common English stopwords
const stopwords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "he",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "that",
  "the",
  "to",
  "was",
  "were",
  "will",
  "with",
]);

const removeStopwords = (
  text: string
): { optimized: string; removed: string[] } => {
  const words = text.split(/\s+/);
  const optimizedWords: string[] = [];
  const removedWords: string[] = [];

  words.forEach((word) => {
    if (!stopwords.has(word.toLowerCase())) {
      optimizedWords.push(word);
    } else {
      removedWords.push(word);
    }
  });

  return {
    optimized: optimizedWords.join(" "),
    removed: removedWords,
  };
};

// Mock API call function
const mockApiCall = async (
  prompt: string
): Promise<{
  response: string;
  optimizedPrompt: string;
  tokensSaved: number;
  whSaved: number;
  removedWords: string[];
}> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { optimized, removed } = removeStopwords(prompt);
  const tokensSaved = removed.length;
  const whSaved = tokensSaved * 0.0001; // Mock calculation
  return {
    response: `Mock response: ${optimized}`,
    optimizedPrompt: optimized,
    tokensSaved,
    whSaved,
    removedWords: removed,
  };
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [stats, setStats] = useState({ tokensSaved: 0, whSaved: 0 });
  const [removedWords, setRemovedWords] = useState<string[]>([]);
  const [showOptimized, setShowOptimized] = useState(false);

  useEffect(() => {
    if (showOptimized) {
      const { removed } = removeStopwords(prompt);
      setRemovedWords(removed);
    }
  }, [prompt, showOptimized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast("Prompt submitted", {
      description: "Your prompt has been sent to the LLM.",
    });

    try {
      const result = await mockApiCall(prompt);
      setResponse(result.response);
      setStats({ tokensSaved: result.tokensSaved, whSaved: result.whSaved });
      setRemovedWords(result.removedWords);
    } catch (error) {
      console.error("Error calling API:", error);
      toast.error("Error", {
        description: "Failed to get response from the LLM.",
      });
    }
  };

  const renderPrompt = () => {
    const words = prompt.split(/\s+/);
    return words.map((word, index) => (
      <span
        key={index}
        className={
          showOptimized && removedWords.includes(word) ? "bg-red-300" : ""
        }
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
                        {!showOptimized ? (
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

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>🤖 LLM Response</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{response || "Response will appear here"}</p>
              </CardContent>
            </Card>
          </div>

          <div className="w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>📊 Optimization Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">🎟️ Tokens Saved</h3>
                    <p>
                      {stats.tokensSaved} (
                      {prompt.length > 0
                        ? (
                            (stats.tokensSaved / prompt.split(/\s+/).length) *
                            100
                          ).toFixed(2)
                        : 0}
                      %)
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">⚡ Watt-hours Saved</h3>
                    <p>{stats.whSaved.toFixed(4)} Wh</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">👥 Scaled for 100 Users</h3>
                    <p>Tokens: {stats.tokensSaved * 100}</p>
                    <p>Watt-hours: {(stats.whSaved * 100).toFixed(2)} Wh</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Toaster />
    </div>
  );
}
