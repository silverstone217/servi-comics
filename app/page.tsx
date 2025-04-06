// import { getUser } from "@/actions/authAction";
import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import NewRealizedContent from "@/components/home/NewRealizedContent";

export default async function Home() {
  // const user = await getUser();
  return (
    <div className="">
      {/* header */}
      <Header />
      {/* hero section */}
      <HeroSection />
      {/* content */}
      <div className="w-full max-w-7xl mx-auto">
        <NewRealizedContent />
      </div>
      {/* footer */}
    </div>
  );
}
