import { Items } from "@/components/Items";
import { Api } from "@/utils/api";
import { GetServerSideProps } from "next";

export default function Home({ sneakers }: any) {
  return (
    <>
      <Items sneakers={sneakers} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const sneakers = await Api(ctx).sneakers.getAll();
    return {
      props: {
        sneakers,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
