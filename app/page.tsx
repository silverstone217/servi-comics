import { getUser } from "@/actions/authAction";
import Header from "@/components/home/Header";

export default async function Home() {
  const user = await getUser();
  return (
    <div className="">
      {/* header */}
      <Header />
      <div>{user?.name}</div>
      {/* hero section */}
      {/* content */}
      {/* footer */}
    </div>
  );
}
