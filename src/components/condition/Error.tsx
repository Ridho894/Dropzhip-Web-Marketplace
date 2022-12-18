import Image from "next/image";

const Error = () => {
  return (
    <section className="text-center h-96 space-y-2 flex flex-col justify-center items-center">
      <Image
        src={"/illustrations/NotFound.png"}
        width={300}
        height={200}
        objectFit="contain"
      />
      <h1 className="font-medium text-gray-600">Whoops!</h1>
      <p className="font-normal text-gray-500">
        Server busy, please try again in a few minutes.
      </p>
    </section>
  );
};

export default Error;
