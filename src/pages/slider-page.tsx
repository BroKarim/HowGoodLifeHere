import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { AlertCircle, Home, Map, TrendingUp } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

//inisialisai tipe data
type MetricKey = "pollutionIndex" | "safetyScore" | "healthIndex" | "trafficTime" | "costOfLiving" | "publicTransport" | "greenSpaces" | "internetSpeed";

type Metrics = Record<MetricKey, number>;

type Weights = Record<MetricKey, number>;

// Define the initial metrics and weights values
const initialMetrics: Metrics = {
  pollutionIndex: 50,
  safetyScore: 50,
  healthIndex: 50,
  trafficTime: 50,
  costOfLiving: 50,
  publicTransport: 50,
  greenSpaces: 50,
  internetSpeed: 50,
};

const weights: Weights = {
  pollutionIndex: 0.2,
  safetyScore: 0.2,
  healthIndex: 0.2,
  trafficTime: 0.15,
  costOfLiving: 0.1,
  publicTransport: 0.05,
  greenSpaces: 0.05,
  internetSpeed: 0.05,
};

const LiveabilityCalculator = () => {
  const [metrics, setMetrics] = useState<Metrics>(initialMetrics);

  const calculateScore = (): number => {
    return Object.entries(metrics).reduce((score, [key, value]) => {
      return score + value * (weights[key as MetricKey] ?? 0);
    }, 0);
  };
  const handleMetricChange = (metric: MetricKey, value: number[]) => {
    setMetrics((prev) => ({
      ...prev,
      [metric]: value[0], // Use the first element of the array
    }));
  };

  const score = calculateScore();

  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  // Prepare the data for radar chart
  const radarData = Object.entries(metrics).map(([key, value]) => ({
    subject: key.replace(/([A-Z])/g, " $1").toLowerCase(),
    value: value,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-6 h-6" />
            Livability Score Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="font-semibold mb-4">Core Metrics</h3>
              {Object.entries(metrics)
                .slice(0, 4)
                .map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium">{key.replace(/([A-Z])/g, " $1").trim()}</label>
                    <div className="relative flex w-full items-center">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-white text-lg font-bold">{[value]}</div>
                      <Slider value={[value]} onValueChange={(val) => handleMetricChange(key as MetricKey, val)} max={100} step={1} />
                    </div>
                  </div>
                ))}

              <h3 className="font-semibold mb-4">Additional Factors</h3>
              {Object.entries(metrics)
                .slice(4)
                .map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium">{key.replace(/([A-Z])/g, " $1").trim()}</label>
                    <Slider value={[value]} onValueChange={(val) => handleMetricChange(key as MetricKey, val)} max={100} step={1} />
                  </div>
                ))}
            </div>

            {/* Visualization Section */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Overall Score</h3>
                <p className={`text-4xl font-bold ${getScoreColor(score)}`}>{score.toFixed(1)}</p>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Metrics" dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Score Interpretation</h4>
                    <ul className="text-sm text-blue-600 mt-2 space-y-1">
                      <li>80-100: Excellent livability</li>
                      <li>60-79: Good livability</li>
                      <li>40-59: Average livability</li>
                      <li>&lt;40: Needs improvement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveabilityCalculator;
