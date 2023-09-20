"use client";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "ui";
import { useMutation } from "@apollo/client";
import { CREATE_DOC, UPDATE_DOC } from "@/api/graphql/gql";
import { useRecoilState } from "recoil";
import {
  atomToast,
  dummyCourses,
  removeUndefindedFromObject,
} from "@cllgnotes/lib";
import {
  CreateDocs,
  DocType,
  FormNewDocProps,
  UpdateDocs,
} from "@cllgnotes/types";

type YearType = 1 | 2 | 3 | 4 | 5;

/**
 how much work is done in admin panel?
 need to setup sending pdf to amazon s3 and first page image to 
 */

const FormNewDoc = ({
  title = "",
  price = 0,
  published = false,
  desc = "",
  department,
  chapters,
  university,
  topic,
  course: crs,
  year,
  subject,
  type,
  img,
  _id,
}: FormNewDocProps) => {
  const toUpdate = _id ? true : false;
  console.log("toUpdate", toUpdate);
  const [titlee, setTitle] = useState<string>(title);
  const [descr, setDesc] = useState<string>(desc || "");
  const [amt, setAmt] = useState(price);
  const [depart, setDepart] = useState<string>(department || "");
  const [image, setImage] = useState<string>(
    img || "https://picsum.photos/id/0/1280/720"
  );
  const [course, setCourse] = useState<string>(crs || "");
  const [yr, setYear] = useState<YearType>((year as YearType) || 1);
  const [univ, setUniversity] = useState<string>(
    university || "SRM University"
  );
  const [typee, setType] = useState<DocType>(type || "notes");
  const [selectedTopics, setTopics] = useState<string[]>(topic || []);
  const [topicsLists, setTopicsList] = useState<string[]>([]);
  const [subj, setSubj] = useState<string>(subject || "");
  const [units, setUnits] = useState<string[]>(chapters || []);
  // https://picsum.photos/id/0/1280/720
  //   const [benefitList, setBenefits] = useState<string[]>(benefits);
  const [publish, setPublished] = useState<boolean>(published);
  const [clicked, setClicked] = useState<boolean>(false);
  const [, setToast] = useRecoilState(atomToast);

  // DATA
  const departs = Object.keys(dummyCourses);
  const courses = Object.keys(dummyCourses?.[depart] || {});
  const subjects = Object.keys(dummyCourses?.[depart]?.[course]?.[yr] || {});
  const unitss = Object.keys(
    dummyCourses?.[depart]?.[course]?.[yr]?.[subj]?.units || {}
  );
  console.log(unitss);

  useEffect(() => {
    const topicList: string[] = [];
    console.log(topicList);

    units?.map(
      (item) =>
        item &&
        dummyCourses[depart]?.[course]?.[yr]?.[subj]?.units?.[item] &&
        topicList.push(
          ...(dummyCourses[depart]?.[course]?.[yr]?.[subj]?.units?.[
            item
          ] as unknown as string[])
        )
    );
    setTopicsList(topicList);
  }, [units]);

  // CREATE/UPDATE COURSE
  const sendDataUpdate: UpdateDocs = {
    title: titlee?.trim(),
    desc: descr?.trim(),
    price: Number(amt),
    department: depart,
    published: publish,
    course: course,
    year: yr,
    type: typee,
    subject: subj,
    subjectCode: dummyCourses?.[depart]?.[yr]?.[subj]?.code || "CHY100",
    chapters: units,
    topic: selectedTopics,
    university: univ,
  };
  const sendDataCreate: CreateDocs = {
    title: titlee?.trim(),
    desc: descr?.trim(),
    price: Number(amt),
    department: depart,
    img: image?.trim(),
    published: publish,
    course: course,
    year: yr,
    type: typee,
    subject: subj,
    subjectCode: dummyCourses?.[depart]?.[yr]?.[subj]?.code || "CHY100",
    chapters: units,
    topic: selectedTopics,
    university: univ,
  };
  const variables: {
    input: UpdateDocs | CreateDocs;
    id?: string;
  } = {
    input: removeUndefindedFromObject(
      toUpdate ? sendDataUpdate : sendDataCreate
    ),
  };
  if (toUpdate) {
    variables["id"] = _id;
  }
  const [mutateDoc, { loading, error, data }] = useMutation(
    toUpdate ? UPDATE_DOC : CREATE_DOC,
    { variables }
  );
  const onDocUpdated = (data: any) => {
    if (data?.updateDoc?.status === "success") {
      setToast({
        text: "Doc Updated Successfully 👍",
        type: "success",
        secs: 5000,
      });
    } else {
      setToast({
        text: "Doc Update Failed 😢. " + (data?.updateDoc?.msg || ""),
        type: "error",
        secs: 5000,
      });
    }
    setClicked(false);
  };
  const onDocCreated = (data: any) => {
    // console.log("data", data);
    if (data?.addDoc?.status === "success") {
      setToast({
        text: "Doc Created Successfully 👍",
        type: "success",
        secs: 5000,
      });
    } else {
      setToast({
        text: "Doc Creation Failed 😢. " + (data?.addDoc?.msg || ""),
        type: "error",
        secs: 5000,
      });
    }
    setClicked(false);
  };
  const onError = () => {
    console.log("error", error);
    setToast({
      text: "Doc Creation Failed 😢. " + error?.message ?? "",
      type: "error",
      secs: 5000,
    });
    setClicked(false);
  };
  const handleButtonClick = () => {
    setClicked(true);
    mutateDoc({
      onCompleted: toUpdate ? onDocUpdated : onDocCreated,
      onError,
    });
  };
  const buttonDisabled =
    titlee.length < 4 ||
    descr.length < 10 ||
    loading ||
    !depart ||
    !image ||
    amt < 0 ||
    amt > 10000 ||
    titlee.length > 100 ||
    descr.length > 250 ||
    image.length > 250 ||
    image.length < 10 ||
    clicked;
  // console.log(loading, buttonDisabled, data);
  const commonProps = {
    sx: { marginBottom: 2, width: "100%", maxWidth: "80ch" },
    style: {
      height: 60,
    },
  };
  return (
    <>
      <FormGroup style={{ gap: 20 }} className="fcfs mt30">
        <TextField
          {...commonProps}
          sx={{ ...commonProps.sx }}
          id="outlined-basic"
          label="Title"
          variant="outlined"
          required={true}
          type="text"
          //   helperText={usernameHelperText()}
          color={"primary"}
          value={titlee}
          error={titlee.length > 0 && titlee?.length < 4}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <TextField
          {...commonProps}
          id="outlined-basic"
          label="Price"
          variant="outlined"
          required={true}
          type="number"
          helperText={"0 for free"}
          color={"primary"}
          value={amt}
          // error={price == 0}
          onChange={(e) => {
            // console.log(e.target.value);
            // setAmt(e.target.value as unknown as number);
            setAmt(0);
          }}
        />
        <TextField
          {...commonProps}
          sx={{ ...commonProps.sx }}
          maxRows={4}
          multiline={true}
          id="outlined-basic"
          label="Description"
          value={descr}
          variant="outlined"
          type="text"
          helperText={"Maximum 250 characters"}
          color={"primary"}
          error={(descr.length > 0 && descr?.length < 10) || descr.length > 250}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        {!toUpdate && (
          <TextField
            {...commonProps}
            sx={{ ...commonProps.sx }}
            id="outlined-basic"
            label="image"
            required={true}
            value={image}
            variant="outlined"
            type="text"
            helperText={"Maximum 250 characters"}
            color={"primary"}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        )}
        {/*  */}
        <FormControl {...commonProps}>
          <InputLabel id="demo-simple-select-type">Type</InputLabel>
          <Select
            labelId="demo-simple-select-type"
            id="demo-simple-select"
            value={typee}
            required={true}
            label="Type"
            onChange={(e) => {
              setType(e.target.value as DocType);
            }}
          >
            {["notes", "presentation", "paper"]?.map((cat, index) => (
              <MenuItem key={index + cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl {...commonProps}>
          <InputLabel id="demo-simple-select-depart">Department</InputLabel>
          <Select
            labelId="demo-simple-select-depart"
            id="demo-simple-select"
            value={depart}
            required={true}
            label="Department"
            onChange={(e) => {
              setDepart(e.target.value);
            }}
          >
            {departs?.map((cat, index) => (
              <MenuItem key={index + cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {depart && (
          <FormControl {...commonProps}>
            <InputLabel id="demo-simple-selcourse">Course</InputLabel>
            <Select
              labelId="demo-simple-selcourse"
              id="demo-simple-select"
              value={course}
              required={true}
              label="Course"
              onChange={(e) => {
                setCourse(e.target.value);
              }}
            >
              {courses?.map((cat, index) => (
                <MenuItem key={index + cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl {...commonProps}>
          <InputLabel id="years">Year</InputLabel>
          <Select
            labelId="years"
            id="demo-simple-year"
            value={yr}
            required={true}
            label="Year"
            onChange={(e) => {
              setYear(e.target.value as unknown as YearType);
            }}
          >
            {[1, 2, 3, 4, 5].map((num, index) => (
              <MenuItem key={index + num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {course && (
          <FormControl {...commonProps}>
            <InputLabel id="demo-simple-subj">Subject</InputLabel>
            <Select
              labelId="demo-simple-subj"
              id="demo-simple-subj"
              value={subj}
              required={true}
              label="Subject"
              onChange={(e) => {
                setSubj(e.target.value);
              }}
            >
              {subjects?.map((cat, index) => (
                <MenuItem key={index + cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {subj && (
          <FormControl {...commonProps}>
            <InputLabel id="demo-simple-units">Units</InputLabel>
            <Select
              multiple
              labelId="demo-simple-units"
              id="demo-simple-units"
              required={true}
              value={units}
              label="Units"
              onChange={(e) => {
                const v = e.target.value as unknown as string[];
                if (v.length > 0) {
                  setUnits(v);
                }
              }}
            >
              {unitss?.map((cat, index) => (
                <MenuItem key={index + cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {units.length > 0 && (
          <FormControl {...commonProps}>
            <InputLabel id="demo-simple-topics">Topics</InputLabel>
            <Select
              multiple
              labelId="demo-simple-topics"
              id="demo-simple-topics"
              value={selectedTopics}
              required={true}
              label="Topics"
              onChange={(e) => {
                const a = e.target.value;
                setTopics(a as unknown as string[]);
              }}
            >
              {topicsLists?.map((cat, index) => (
                <MenuItem key={index + cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <FormControlLabel
          sx={{ marginBottom: 2 }}
          control={
            <Switch
              checked={publish}
              onChange={(e) => {
                setPublished(e.target.checked);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          labelPlacement="start"
          label="Publish"
        />
        <Button
          height={60}
          // disabled={buttonDisabled}
          buttonStyles={{ maxWidth: "35ch" }}
          loading={loading || clicked}
          text={_id ? "Update" : "Create"}
          onClick={handleButtonClick}
        />
      </FormGroup>
    </>
  );
};

export default FormNewDoc;
