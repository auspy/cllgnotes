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
  Borders,
  CreateDocs,
  DocType,
  DocTypeArr,
  FormNewDocProps,
  TestType,
  TestTypeArr,
  UpdateDocs,
} from "@cllgnotes/types";
import { zodUpdateDoc, zodCreateDocClient, getZodErrMsg } from "@cllgnotes/zod";
import Colors from "@cllgnotes/types/colors";

type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
const sems = [1, 2, 3, 4, 5, 6, 7, 8];
type Year = 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 | 2027 | 2028;
const Years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028];
type University = "SRM University";
const Universitys = ["SRM University"];
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
  testType,
  subjectCode,
  course: crs,
  year,
  type,
  subject,
  semester,
  img,
  _id,
}: FormNewDocProps) => {
  const toUpdate = _id ? true : false;
  const zod = toUpdate ? zodUpdateDoc : zodCreateDocClient;
  // const commonDoc = zod?.shape?.input?.shape;
  console.log("toUpdate", toUpdate);
  const [titlee, setTitle] = useState<string>(title);
  const [descr, setDesc] = useState<string>(desc || "");
  const [amt, setAmt] = useState(price);
  const [depart, setDepart] = useState<string>(department || "");
  const [image, setImage] = useState<File>({} as File);
  const [course, setCourse] = useState<string>(crs || "");
  const [yr, setYear] = useState<Year>(year || 2023);
  const [sem, setSem] = useState<Semester>(semester || 1);
  const [uploadedImg, setUploadedImg] = useState<string>("");
  const [univ, setUniversity] = useState<string>(
    university || "SRM University"
  );
  const [typee, setType] = useState<DocType>(type || "notes");
  const [testTypee, setTestType] = useState<TestType>(testType || "mst1");
  const isPaper = typee === "paper";
  const [selectedTopics, setTopics] = useState<string[]>(topic || []);
  const [topicsLists, setTopicsList] = useState<string[]>([]);
  const [subj, setSubj] = useState<string>(subject || "");
  console.log(subject, "subject");
  const [subjCode, setSubjCode] = useState<string>(
    subjectCode ||
      dummyCourses?.[depart]?.[course]?.[sem]?.[subj]?.code ||
      "Randmo"
  );
  const [units, setUnits] = useState<string[]>(chapters || []);
  // https://picsum.photos/id/0/1280/720
  //   const [benefitList, setBenefits] = useState<string[]>(benefits);
  const [publish, setPublished] = useState<boolean>(published);
  const [clicked, setClicked] = useState<boolean>(false);
  const [, setToast] = useRecoilState(atomToast);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // DATA
  const departs = Object.keys(dummyCourses);
  const courses = Object.keys(dummyCourses?.[depart] || {});
  const subjects = Object.keys(dummyCourses?.[depart]?.[course]?.[sem] || {});

  const unitss = Object.keys(
    dummyCourses?.[depart]?.[course]?.[sem]?.[subj]?.units || {}
  );
  // console.log(unitss);

  useEffect(() => {
    const topicList: string[] = [];
    // console.log(topicList);

    units?.map(
      (item) =>
        item &&
        dummyCourses[depart]?.[course]?.[sem]?.[subj]?.units?.[item] &&
        topicList.push(
          ...(dummyCourses[depart]?.[course]?.[sem]?.[subj]?.units?.[
            item
          ] as unknown as string[])
        )
    );
    setTopicsList(topicList);
  }, [units]);

  // CREATE/UPDATE COURSE
  const sendDataUpdate: UpdateDocs = {
    price: Number(amt),
    department: depart,
    published: publish,
    course: course,
    semester: sem,
    year: yr,
    type: typee,
    subject: subj,
    subjectCode: subjCode,
    university: univ,
  };
  const sendDataCreate: CreateDocs = {
    price: Number(amt),
    department: depart,
    img: image || (null as unknown as File),
    published: publish,
    course: course,
    semester: sem,
    year: yr,
    type: typee,
    subject: subj,
    subjectCode: subjCode,
    university: univ,
  };
  if (isPaper) {
    sendDataCreate["testType"] = testTypee;
    sendDataUpdate["testType"] = testTypee;
  } else if (typee === "notes") {
    sendDataCreate["topics"] = selectedTopics;
    sendDataCreate["units"] = units;
    sendDataCreate["desc"] = descr?.trim();
    sendDataCreate["title"] = titlee?.trim();
    sendDataUpdate["topics"] = selectedTopics;
    sendDataUpdate["units"] = units;
    sendDataUpdate["desc"] = descr?.trim();
    sendDataUpdate["title"] = titlee?.trim();
  }
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
  const onError = (e) => {
    console.log("error", error, e);
    setToast({
      text: "Doc Creation Failed 😢. " + error?.message ?? "",
      type: "error",
      secs: 5000,
    });
    setClicked(false);
  };
  const handleButtonClick = () => {
    console.log("data sent", zod.shape, variables);
    try {
      const a = { ...zod.parse(variables), img: image };
      console.log("data sent", a);
      setClicked(true);
      mutateDoc({
        variables: a,
        onCompleted: toUpdate ? onDocUpdated : onDocCreated,
        onError,
      });
      setErrors({});
    } catch (error) {
      const issues = error?.issues;
      console.log(error?.issues, "here");
      const a = {};
      if (issues) {
        for (const err of issues) {
          console.log(err, err.path?.length);

          a[err.path[1]] = err.message;
        }
        setToast({
          type: "error",
          text: getZodErrMsg(error),
          secs: 5000,
        });
        setErrors(a);
      }
    }

    // if (toUpdate) {
    //   mutateDoc({
    //     onCompleted: onDocUpdated,
    //     onError,
    //   });
    // } else {
    //   mutateDoc({
    //     onCompleted: onDocCreated,
    //     onError,
    //   });
    //   return;
    //   // send data using formdata
    //   // const formData = new FormData();
    //   // formData.append(
    //   //   "operations",
    //   //   JSON.stringify({
    //   //     query:
    //   //       "mutation ($input: CreateDocInput!) { addDoc(input: $input) { status msg err data { ... on updateRes { acknowledged matchedCount modifiedCount } ... on Doc { title _id img } } } }",
    //   //     variables: {
    //   //       input: sendDataCreate,
    //   //     },
    //   //   })
    //   // );
    //   // formData.append("map", JSON.stringify({ "0": ["variables.input.img"] }));
    //   // formData.append("0", image);
    //   // fetch(urlGql, {
    //   //   method: "POST",
    //   //   body: formData,
    //   //   headers: {
    //   //     credentials: "include",
    //   //     // "x-apollo-operation-name": "addDoc",
    //   //     "apollo-require-preflight": "true",
    //   //   },
    //   // })
    //   //   .then((res) => {
    //   //     console.log("fetch res", res);
    //   //     // onDocCreated(res.json());
    //   //   })
    //   //   .catch((e) => {
    //   //     console.log("fetch error", e);
    //   //     onError(e);
    //   //   });
    // }
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
            {DocTypeArr?.map((cat, index) => (
              <MenuItem key={index + cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {isPaper ? (
          <FormControl {...commonProps}>
            <InputLabel id="demo-simple-test-type">Exam Type</InputLabel>
            <Select
              labelId="demo-simple-test-type"
              id="demo-simple-test-type"
              value={testTypee}
              required={true}
              label="Exam Type"
              onChange={(e) => {
                setTestType(e.target.value as TestType);
              }}
            >
              {TestTypeArr.map((cat, index) => (
                <MenuItem key={index + cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <>
            <TextField
              {...commonProps}
              sx={{ ...commonProps.sx }}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              required={true}
              type="text"
              helperText={errors["title"] || ""}
              color={"primary"}
              value={titlee}
              error={Boolean(errors["title"])}
              onChange={(e) => {
                setTitle(e.target.value);
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
              helperText={errors["desc"] || ""}
              color={"primary"}
              error={"desc" in errors}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </>
        )}
        <TextField
          {...commonProps}
          id="outlined-basic"
          label="Price"
          variant="outlined"
          required={true}
          type="number"
          helperText={errors["price"] || ""}
          color={"primary"}
          value={amt}
          error={Boolean(errors["price"])}
          onChange={(e) => {
            // console.log(e.target.value);
            // setAmt(e.target.value as unknown as number);
            setAmt(0);
          }}
        />
        {!toUpdate && (
          <>
            <input
              // {...commonProps}
              style={
                errors["img"]
                  ? {
                      border: Borders.red,
                      padding: "10px 20px 10px 5px",
                      borderRadius: 5,
                    }
                  : {}
              }
              value={uploadedImg || ""}
              type="file"
              name="img"
              accept="application/pdf, application/vnd.ms-excel"
              required={true}
              onChange={({ target: { validity, files, value } }) => {
                const file = files?.[0];
                if (file && validity.valid) {
                  setImage(file);
                  console.log(file);
                  // setUploadedImg(URL.createObjectURL(file));
                }
                setUploadedImg(value);
              }}
            />
            <label
              style={{ color: Colors.red }}
              className="regu12"
              htmlFor="img"
            >
              {errors["img"]}
            </label>
            {/* <iframe src={uploadedImg} height={160} width={90} /> */}
          </>
        )}

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

        <FormControl {...commonProps}>
          <InputLabel id="years">Semester</InputLabel>
          <Select
            labelId="years"
            id="demo-simple-Semester"
            value={sem}
            required={true}
            label="Semester"
            onChange={(e) => {
              setSem(e.target.value as unknown as Semester);
            }}
          >
            {sems.map((num, index) => (
              <MenuItem key={index + num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl {...commonProps}>
          <InputLabel id="years">Year</InputLabel>
          <Select
            labelId="years"
            id="demo-simple-Year"
            value={yr}
            required={true}
            label="Year"
            placeholder="2023"
            onChange={(e) => {
              setYear(e.target.value as unknown as Year);
            }}
          >
            {Years.map((num, index) => (
              <MenuItem key={index + num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl {...commonProps}>
          <InputLabel id="demo-simple-univ">University</InputLabel>
          <Select
            labelId="demo-simple-univ"
            id="demo-simple-univ"
            value={univ}
            required={isPaper}
            label="University"
            onChange={(e) => {
              setUniversity(e.target.value as University);
            }}
          >
            {Universitys.map((cat, index) => (
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
                !toUpdate &&
                  setSubjCode(
                    dummyCourses?.[depart]?.[course]?.[sem]?.[e.target.value]
                      ?.code || "random"
                  );
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

        <TextField
          {...commonProps}
          sx={{ ...commonProps.sx }}
          id="outlined-basic"
          label="Subject Code"
          variant="outlined"
          required={true}
          type="text"
          helperText={errors["subjectCode"] || ""}
          color={"primary"}
          value={subjCode}
          error={Boolean(errors["subjectCode"])}
          disabled={!toUpdate}
          onChange={(e) => {
            setSubjCode(e.target.value);
          }}
        />
        {!isPaper && (
          <>
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
          </>
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
