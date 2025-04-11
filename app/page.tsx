// import { getUser } from "@/actions/authAction";
import { getContents } from "@/actions/contentsActions";
import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import NewRealizedContent from "@/components/home/NewRealizedContent";

export default async function Home() {
  // const user = await getUser();

  const contents = await getContents();

  return (
    <div className="">
      {/* header */}
      <Header />
      {/* hero section */}
      <HeroSection contents={contents} />
      {/* content */}
      <div className="w-full max-w-7xl mx-auto">
        <NewRealizedContent contents={contents} />
      </div>
      {/* footer */}
    </div>
  );
}
