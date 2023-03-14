import { BannerPickModal, Tag } from "@/components";
import CountrySelect from "@/components/CountrySelect";
import Layout from "@/components/Layout";
import instance from "@/configs/axios";
import { AVAILABLE_TAGS } from "@/constants/AVAILABLE_TAGS";
import { PRIVACY } from "@/constants/PRIVACY";
import { IEvent } from "@/types/Event";
import Head from "next/head";
import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { BsFillCalendarDateFill, BsFillImageFill } from "react-icons/bs";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { MdGroups, MdOutlineLanguage } from "react-icons/md";
import styled from "styled-components";

export default function Home() {
  const methods = useForm<IEvent>({
    defaultValues: {
      capacity: 5,
      price: 1000,
      startAt: new Date().toISOString(),
      title: "Untitle Event",
      tags: [],
    },
  });

  const [toastMessage, setToastMessage] = useState('')
  const [modal, setModal] = useState<HOME_MODAL>(HOME_MODAL.NONE);
  const values = methods.watch();

  /**
   * MAPPED VALUES
   */
  const availableTags = AVAILABLE_TAGS.filter(
    (item) => !values.tags.includes(item)
  );

  /**
   * EVENT HANDLERS
   */
  const onAddTag = (toAddTag: string) => {
    methods.setValue("tags", [...values.tags, toAddTag]);
  };

  const onRemoveTag = (toRemove: string) => {
    const nextTags = values.tags.filter((item) => item === toRemove);
    methods.setValue("tags", nextTags);
  };

  const onToggleBanner = () => setModal(HOME_MODAL.BANNER);

  const onCloseModal = () => setModal(HOME_MODAL.NONE);

  const onSaveBanner = (banner: string) => {
    methods.setValue("banner", banner);
    onCloseModal();
  };

  const onDateChange = (date: Date) => {
    methods.setValue("startAt", date.toISOString());
  };

  const onSelectPrivacy = (privacy: string) => {
    methods.setValue("privacy", privacy);
  };

  const clearToast = () => setToastMessage('')

  const onSubmit = async () => {
    /* TO-DO: Change this one to more proper API handle lib like React-Query */
    try {
      const response = await instance.post("/interview/social", values);
      setToastMessage('Successfully created your Event.')
    } catch (e) {
      setToastMessage('Error while creating this Event, please contact administration for more info.')
    }
  };

  /**
   * SIDE EFFECTS
   */

  /**
   * MAIN RETURN
   */

  return (
    <>
      <Head>
        <title>Supercomos - Create Social Event</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-[var(--layout-padding)]">
        <div className="flex flex-row mt-[124px]">
          <div className="flex-1 flex flex-col">
            <EditableDiv
              className="text-white text-4xl font-bold p-3"
              suppressContentEditableWarning={true}
              {...methods.register("title")}
              contentEditable
            >
              {values.title}
            </EditableDiv>

            <div className="mt-3 flex flex-row">
              <div className="flex-1 flex">
                <div className="flex justify-center items-center w-11 h-11 bg-[var(--primary)]">
                  <BsFillCalendarDateFill color="white" />
                </div>
                <DatePicker
                  className="h-[42px] pl-3"
                  selected={new Date(values.startAt)}
                  dateFormat="dd-MM-yyyy"
                  onChange={onDateChange}
                />
              </div>

              <div className="flex-1 flex">
                <div className="flex justify-center ml-4 items-center w-11 h-11 bg-[var(--primary)]">
                  <IoIosTime color="white" />
                </div>
                <DatePicker
                  className="h-[42px] pl-3"
                  selected={new Date(values.startAt)}
                  onChange={onDateChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
            </div>

            {/** COUNTRY SELECT */}
            <div className="mt-3 flex flex-row">
              <div className="flex justify-center items-center w-11 h-11 bg-[var(--primary)]">
                <MdOutlineLanguage color="white" />
              </div>
              <CountrySelect className="w-[50%]" />
            </div>

            <div className="mt-3 flex flex-row">
              <div className="flex justify-center items-center w-11 h-11 bg-[var(--primary)]">
                <MdGroups color="white" />
              </div>
              <Input
                type="number"
                min="1"
                max="100"
                className="text-base font-bold p-2 h-full"
                {...methods.register("capacity")}
              />

              <div className="flex ml-3 justify-center items-center w-11 h-11 bg-[var(--primary)]">
                <FaMoneyBillWaveAlt color="white" />
              </div>
              <Input
                type="number"
                min="1"
                max="100"
                className="text-base font-bold p-2 h-full"
                {...methods.register("price")}
              />
            </div>

            <div className="mt-5">
              <p className="mb-1 text-lg">Description</p>
              <Textarea
                rows={7}
                className="w-full rounded"
                {...methods.register("description")}
              />
            </div>

            <div className="mt-5 rounded-2xl bg-white mb-4 p-8">
              <p className="text-4xl mb-3 font-bold">Settings</p>
              <Form.Check
                type="checkbox"
                className="mb-4"
                label="I want to approve attendees"
                {...methods.register("isManualApprove")}
              />

              <p className="text-lg mb-3 font-bold">Privacy</p>
              <div className="flex mb-4">
                {Object.keys(PRIVACY).map((privacyType) => (
                  <Form.Check
                    key={privacyType}
                    type="radio"
                    className="mr-4"
                    label={(PRIVACY as any)[privacyType] as string}
                    onChange={() =>
                      onSelectPrivacy((PRIVACY as any)[privacyType] as string)
                    }
                    checked={
                      values.privacy ===
                      ((PRIVACY as any)[privacyType] as string)
                    }
                  />
                ))}
              </div>

              <p className="text-lg font-bold">Tag your social</p>
              <p className="text-base mb-3 font-thin">
                Pick tags for our curation engine to work its magin
              </p>

              <div className="flex mb-3">
                {values.tags.map((value) => (
                  <Tag
                    className="mr-2"
                    closeable={true}
                    selected={values.tags.includes(value)}
                    onClick={onAddTag}
                    onClose={onRemoveTag}
                    key={value}
                    value={value}
                  >
                    {value}
                  </Tag>
                ))}
              </div>

              <div className="flex mb-3">
                {availableTags.map((value) => (
                  <Tag
                    className="mr-2"
                    closeable={false}
                    selected={values.tags.includes(value)}
                    onClick={onAddTag}
                    onClose={onRemoveTag}
                    key={value}
                    value={value}
                  >
                    {value}
                  </Tag>
                ))}
              </div>
            </div>
            <button
              onClick={onSubmit}
              className="px-2 py-3 flex items-center mb-11 justify-center w-full rounded-2xl bg-[#FEF452]"
            >
              CREATE SOCIAL
            </button>

            <Toast show={!!toastMessage} onClose={clearToast} animation className="fixed top-3 right-3">
              <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
          </div>

          <div className="flex-1">
            <div
              style={{
                border: !values.banner ? "white 2px dashed" : "",
                backgroundPosition: "center",
                background: !values.banner
                  ? "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))"
                  : `url(${values.banner})`,
              }}
              className="w-full h-[400px] rounded-tr-[64px] rounded-bl-[64px] flex items-center cursor-pointer justify-center m-4"
              onClick={onToggleBanner}
            >
              {!values.banner && (
                <>
                  <BsFillImageFill />
                  <span className="ml-2">Add a banner</span>
                </>
              )}
            </div>

            <BannerPickModal
              onSave={onSaveBanner}
              show={modal === HOME_MODAL.BANNER}
              onClose={onCloseModal}
            />
          </div>
        </div>
      </main>
    </>
  );
}

Home.layout = Layout;

/**
 * Styles
 * TODO: Seperate following sections into they own file
 */

const EditableDiv = styled.div`
  width: fit-content;
  word-break: break-all;
  max-width: 100%;
  background: var(--primary);

  :focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 8px;
  max-width: 100%;

  :focus {
    outline: none;
  }
`;

const Input = styled.input`
  width: fit-content;
  word-break: break-all;
  max-width: 100%;

  :focus {
    outline: none;
  }
`;

/**
 * Constants
 */

export const HEIGHT_LIMIT = 200;

export enum HOME_MODAL {
  NONE = 0,
  BANNER = 1,
}
