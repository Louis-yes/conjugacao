import Head from 'next/head'
import AddVerbForm from "../components/AddVerbForm"

function HomePage() {
    return( 
    <div>
     <Head>
        <title>Conjugação</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <h1>
            Vamos lá 🇧🇷!
        </h1>
        <AddVerbForm></AddVerbForm>
    </div>
    )
}
export default HomePage