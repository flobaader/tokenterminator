"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

// Mock API call function
const mockApiCall = async (
  prompt: string
): Promise<{ response: string; optimizedPrompt: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    response: `Mock response: ${prompt}`,
    optimizedPrompt: `Optimized: ${prompt.trim().toLowerCase()}`,
  };
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast("Prompt submitted", {
      description: "Your prompt has been sent to the LLM.",
    });

    try {
      const result = await mockApiCall(prompt);
      setResponse(result.response);
      setOptimizedPrompt(result.optimizedPrompt);
    } catch (error) {
      console.error("Error calling API:", error);
      toast.error("Error", {
        description: "Failed to get response from the LLM.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            TokenTerminator
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Enter your prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="prompt">Prompt</Label>
                  <Input
                    id="prompt"
                    placeholder="Enter your prompt here"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        {response && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>LLM Response</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{response}</p>
            </CardContent>
          </Card>
        )}

        {optimizedPrompt && (
          <Card>
            <CardHeader>
              <CardTitle>Optimized Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{optimizedPrompt}</p>
            </CardContent>
          </Card>
        )}
      </main>

      <Toaster />
    </div>
  );
}
