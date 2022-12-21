import { useRouter } from "next/router";
import VerbCard from "../components/VerbCard";

const Verb = () => {
    const router = useRouter();
    const {verb} = router.query;

    return <VerbCard verb={verb as string} group="indicative/present" groupSelect={() => {}} onRemove={() => {}}></VerbCard>
}

export default Verb