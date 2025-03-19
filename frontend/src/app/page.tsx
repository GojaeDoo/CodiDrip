import { FC } from "react";
import Layout from "./layout"; // Layout 컴포넌트 가져오기

import Header from "@/pages/header";
import Footer from "@/pages/footer";
import User from "@/pages/user";
// import Intro from "@/pages/intro";
// import Drips from "@/pages/drips";

const Home: FC = () => {
  return (
    <Layout>
      <Header />
      <User />
      <Footer />
    </Layout>
  );
};

export default Home;
