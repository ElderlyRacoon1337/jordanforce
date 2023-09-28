import { Items } from "@/components/Items";
import { Api } from "@/utils/api";
import { countPrice } from "@/utils/countPrice";
import { GetServerSideProps } from "next";

export default function Home({ sneakers }: any) {
  return (
    <div style={{ minHeight: "calc(100vh - 50px)" }}>
      <Items sneakers={sneakers} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const sneakers = await Api(ctx).sneakers.getAll();
    const sneakersMapped = await Promise.all(
      sneakers.map(async (el, i) => {
        const price = await countPrice(el.price);
        return { ...el, price };
      })
    );

    return {
      props: {
        sneakers: sneakersMapped,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
