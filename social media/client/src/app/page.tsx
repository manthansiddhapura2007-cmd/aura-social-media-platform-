import { Stories } from "@/components/home/Stories";
import { Feed } from "@/components/home/Feed";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-300">
      <div className="w-full max-w-[600px] mx-auto">
        <Stories />
        <Feed />
      </div>
    </div>
  );
}

