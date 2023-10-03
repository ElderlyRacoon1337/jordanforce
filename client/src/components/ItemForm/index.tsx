import React, { useRef, useState } from "react";
import styles from "./ItemForm.module.scss";
import {
  Alert,
  Button,
  Checkbox,
  Icon,
  Input,
  Loader,
  Menu,
  MenuItem,
} from "cutie-ui";
import { Api } from "@/utils/api";

export const ItemForm = ({ data, isAdd }: any) => {
  const [deleteStatus, setDeleteStatus] = useState<
    "never" | "loading" | "loaded" | "error"
  >("never");
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [title, setTitle] = useState(data ? data.title : "");
  const [price, setPrice] = useState<Number | "">(data ? data.price : "");
  const [sizes, setSizes] = useState(
    data ? data.sizes.map((el) => `${el.size}-${el.price}`).join(",") : []
  );
  const [isAvailable, setIsAvailable] = useState(
    data ? data.isAvailable : false
  );
  const [model, setModel] = useState(data ? data.model : "");
  const [images, setImages] = useState(data ? data.images : []);

  const [submitStatus, setSubmitStatus] = useState("");

  const [alertOpen, setAlertOpen] = useState(false);

  const [ancorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(ancorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleUpdate = () => {
    setSubmitStatus("loading");
    try {
      Api().sneakers.update(data._id, {
        title,
        price,
        sizes: sizes
          .replace(/ /g, "")
          .split(",")
          .map((el) => {
            return { size: +el.split("-")[0], price: +el.split("-")[1] };
          }),
        isAvailable,
        images,
        model,
      });
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      console.log(error);
    }
  };

  const inputFileRef = useRef(null);
  const handleChangeFile = async (event: any) => {
    try {
      const formData = new FormData();
      if (event.target.files) {
        const files: any[] = Array.from(event.target.files);
        files.forEach((image, index) => {
          formData.append(`images`, image);
        });
      }
      const data = await Api().sneakers.upload(formData);
      if (data) {
        setAlertOpen(true);
        setImages(data.images);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    setSubmitStatus("loading");
    try {
      Api().sneakers.create({
        title,
        price,
        sizes: sizes
          .replace(/ /g, "")
          .split(",")
          .map((el) => {
            return { size: +el.split("-")[0], price: +el.split("-")[1] };
          }),
        isAvailable,
        images,
        model,
      });
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      console.log(error);
    }
  };

  const handleDelete = () => {
    setDeleteStatus("loading");
    try {
      Api().sneakers.delete(data._id);
      setDeleteStatus("loaded");
      setDeleteAlertOpen(true);
    } catch (error) {
      setDeleteStatus("error");
      setDeleteAlertOpen(true);
      console.log(error);
    }
  };

  return (
    <div className={styles.root}>
      <Input
        size="large"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        placeholder="Название"
      />
      <Input
        size="large"
        value={price}
        onChange={(e) => setPrice(+e.currentTarget.value)}
        placeholder="Цена"
      />
      <Input
        size="large"
        value={sizes}
        onChange={(e) => setSizes(e.currentTarget.value)}
        placeholder="Размеры (через запятую)"
      />
      <Checkbox
        size="large"
        label="Есть в наличии"
        checked={isAvailable}
        onChange={(e) => setIsAvailable(e.target.checked)}
      />
      <Input
        size="large"
        value={model}
        other={{ onClick: handleClick }}
        onChange={(e) => setModel(e.currentTarget.value)}
        placeholder="Модель"
      />
      <Button
        size="large"
        variant="outlined"
        className={styles.button}
        color="textPrimary"
        // @ts-ignore
        onClick={() => inputFileRef.current.click()}
        startIcon={
          <Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </Icon>
        }
      >
        Прикрепить фото
      </Button>
      <input
        onChange={handleChangeFile}
        type="file"
        hidden
        accept="image/*"
        multiple
        ref={inputFileRef}
        name="images"
      />
      <Button
        className={styles.button}
        color="textPrimary"
        endIcon={
          submitStatus == "loading" && (
            <Loader
              variant={1}
              size={"1rem"}
              circleLight
              fatness={"1.5px"}
              color="black"
            />
          )
        }
        onClick={isAdd ? handleSubmit : handleUpdate}
        size="large"
        variant="contained"
      >
        {isAdd ? "Добавить" : "Изменить"}
      </Button>
      {!isAdd && (
        <Button
          onClick={handleDelete}
          color="#5C1F28"
          size="large"
          className={styles.button}
          variant="contained"
        >
          Удалить
        </Button>
      )}
      <Menu
        fullWidth
        // @ts-ignore
        anchorEl={ancorEl}
        onClose={handleClose}
        open={open}
      >
        <MenuItem
          divider
          onClick={() => {
            handleClose();
            setModel("Nike Air Jordan 4");
          }}
        >
          Nike Air Jordan 4
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setModel("Nike Jordan 1 Low");
          }}
        >
          Nike Jordan 1 Low
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setModel("Nike Jordan 1 Mid");
          }}
        >
          Nike Jordan 1 Mid
        </MenuItem>
        <MenuItem
          divider
          onClick={() => {
            handleClose();
            setModel("Nike Jordan 1 High");
          }}
        >
          Nike Jordan 1 High
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setModel("Nike Air Force 1 Low");
          }}
        >
          Nike Air Force 1 Low
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setModel("Nike Air Force 1 Mid");
          }}
        >
          Nike Air Force 1 Mid
        </MenuItem>
        <MenuItem
          divider
          onClick={() => {
            handleClose();
            setModel("Nike Air Force 1 High");
          }}
        >
          Nike Air Force 1 High
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setModel("Nike Dunk Low");
          }}
        >
          Nike Dunk Low
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setModel("Nike Dunk Mid");
          }}
        >
          Nike Dunk Mid
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setModel("Nike Dunk High");
          }}
        >
          Nike Dunk High
        </MenuItem>
      </Menu>
      <Alert
        open={alertOpen}
        onClose={() => {
          setAlertOpen(false);
        }}
        color="success"
      >
        Фотография загружена
      </Alert>
      <Alert
        open={deleteAlertOpen}
        onClose={() => {
          setDeleteAlertOpen(false);
        }}
        color={`${
          deleteStatus == "loaded"
            ? "success"
            : deleteStatus == "error"
            ? "error"
            : ""
        }`}
      >
        {deleteStatus == "loaded"
          ? "Товар удален"
          : deleteStatus == "error"
          ? "Ошибка при удалении товара"
          : ""}
      </Alert>
    </div>
  );
};
