
import { getExperienceWithServer } from "@/app/services";
import ErrorPage from "@/components/common/error";
import { ExperienceDeatils } from "@/components/experiences/experience";

interface IParams {
  experienceId: string;
}

async function Page({ params }: { params: IParams }) {
  try {
    const experienceDetails = await getExperienceWithServer(+params.experienceId)

    return (
      <div
        className="
      w-full
      h-auto
      flex
      flex-col
      text-[70px]"
      >
        <ExperienceDeatils experienceDetails={experienceDetails} />
      </div>
    );
  } catch (error: any) {
    let err:string = error;
    return (<ErrorPage error={err}/>)
  }
}

export default Page;