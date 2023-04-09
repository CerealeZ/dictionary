import Head from "next/head"

interface HeadProps {
    title: string;
    description?: string;
}

export default function index({title, description = "Definitions of the words searched"}: HeadProps) {
  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Head>
  )
}