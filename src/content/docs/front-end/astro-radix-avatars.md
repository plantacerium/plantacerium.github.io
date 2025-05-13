---
title: Astro Radix UI Avatar
---
## Issue GitHub Resume:
https://github.com/shadcn-ui/ui/issues/987


## Solution, tested.

````jsx
// AvatarComponent.jsx
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const AvatarComponent = ({ src, alt, fallbackText }) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
};
````

then

````astro
---
// pages/index.astro
import "@/styles/globals.css";
import Layout from "../layouts/Layout.astro";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarComponent } from "../components/AvatarComponent.jsx"; // Adjust the path as needed
---

<Layout title="shadcn test">
  <Card>
    <CardContent>
      <AvatarComponent client:load src="https://github.com/shadcn.png" alt="@marklyck" fallbackText="ML" />
      <h2 class="text-lg">A portfolio brimming with innovation.</h2>
    </CardContent>
  </Card>
</Layout>
````