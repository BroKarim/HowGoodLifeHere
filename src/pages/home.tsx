import React, { useState } from "react";

import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ActivityIcon, GitBranchIcon, GitPullRequestIcon, StarIcon, Info, Heart } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ScrollableProgress from "@/components/progress-bar";
import DiscreteProgressInput from "@/components/discreate-progress-bar";

const pollutionOptions = [
  { label: "Very Clean", value: 10 },
  { label: "Clean", value: 30 },
  { label: "Moderate", value: 50 },
  { label: "Polluted", value: 70 },
  { label: "Very Polluted", value: 90 },
];

const safetyOptions = [
  { label: "Very Unsafe", value: 10 },
  { label: "Unsafe", value: 30 },
  { label: "Moderate", value: 50 },
  { label: "Safe", value: 70 },
  { label: "Very Safe", value: 90 },
];

export default function Home() {
  const [chosenOption, setChosenOption] = useState({
    pollution: { label: "", value: 0 },
    safety: { label: "", value: 0 },
  });

  // General handler for changing chosen values
  const handleChosenChange = (type: "pollution" | "safety", value: number, options: { label: string; value: number }[]) => {
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      setChosenOption((prevState) => ({
        ...prevState,
        [type]: selectedOption, // Update the specific type (pollution, safety, etc.)
      }));
    }
  };

  return (
    <>
      <section className="container mt-10 flex flex-col items-center text-center">
        <div className="mx-auto mb-10 flex w-full max-w-4xl flex-col gap-5">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Open sou</p>
          <h2 className="font-heading text-3xl leading-[1.1] md:text-5xl">Discover the True Quality of Your Future Home</h2>
          <p className="text-large font-medium text-muted-foreground">HowGoodLifeHero helps you analyze environmental factors like pollution, safety, traffic, and healthcare, so you can make informed decisions about where to livel</p>
        </div>
      </section>
      <section className="container mt-10 flex flex-col gap-y-8 items-center">
        <div className="mx-auto grid w-full  gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Pollution */}
          <Dialog>
            <DialogTrigger>
              <Card className="border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] ">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pollution Index</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Consider the air and water quality, how well trash is managed, and the general cleanliness of an area</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-left font-bold">{chosenOption.pollution.label ? `${chosenOption.pollution.label}` : "NaN"}</div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogDescription>
                Evaluate environmental quality factors:
                <br />
                air and water purity, waste management efficiency, noise and light pollution levels, availability of green spaces, and overall pollution-related comfort. (Lower is betterr)
              </DialogDescription>
              <div className="relative">
                <ScrollableProgress options={pollutionOptions} onValueChange={(value) => handleChosenChange("pollution", value, pollutionOptions)} />
              </div>
              <DialogClose>
                <Button>Chooses</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
          {/* Safety Index */}
          <Dialog>
            <DialogTrigger>
              <Card className="border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] ">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Safety Index</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Consider crime rates, how safe people feel walking alone and the risk of natural disasters.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-left font-bold">{chosenOption.pollution.label ? `${chosenOption.safety.label}` : "NaN"}</div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
              <div className="relative">
                <ScrollableProgress options={safetyOptions} onValueChange={(value) => handleChosenChange("safety", value, safetyOptions)} />
              </div>
              <DialogClose>
                <Button>Chooses</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
          {/* Health index */}
          <Dialog>
            <DialogTrigger>
              <Card className="border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] ">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Health index</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Consider the healthcare professionals, equipment, staff, and doctors</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-left font-bold">100</div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <Card className="border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] ">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Traffic Time</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>How much extra time it takes to get around due to traffic</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-left font-bold">Good</div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <Button className="bg-white text-black border-black border-2 shadow-[3px_4px_0px_rgba(0,0,0,1)]" type="submit">
          Submit
        </Button>
      </section>
    </>
  );
}
