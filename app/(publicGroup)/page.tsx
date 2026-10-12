import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import UserProfile from "./UserProfile"; 


export default function HomePage() {
  return (
    <div>
      
      <h1>Hello Next.js</h1>

      
      {/* <Suspense fallback={<div>Loading...</div>}>
        <UserProfile />
      </Suspense> */}
 
      <Button>Click Me</Button>
    </div>
  );
}