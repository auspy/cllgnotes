import { Heading, LinkButton, Text } from "ui";
import DashCourses from "./DashDocs";

const page = () => {
  return (
    <>
      <div
        id="dashHeader"
        className="frcsb"
        style={{ padding: "30px 0", gap: "30px 50px", flexWrap: "wrap" }}
      >
        <Text type="h1" text="Cllgnotes Dashboard" />
        <LinkButton
          text="Create new course"
          textProps={{
            textClass: "w100",
          }}
          href="/dashboard/create-doc"
          buttonStyles={{ height: "min-content", alignSelf: "center" }}
        />
      </div>
      <div className="mt30">
        <h4 className="upper semi mb20" style={{ opacity: 0.5 }}>
          Created Docs
        </h4>
        <DashCourses />
      </div>
    </>
  );
};

export default page;
