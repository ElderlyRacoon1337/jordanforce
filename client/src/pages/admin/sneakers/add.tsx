import React, { useRef, useState } from "react";
import styles from "../Admin.module.scss";
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
import { AdminMenu } from "@/components/AdminMenu";
import { Api } from "@/utils/api";

export default function AddSneakers() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<Number | "">("");
  const [sizes, setSizes] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [model, setModel] = useState("");
  const [images, setImages] = useState([]);

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

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.admin}>
          <div className={styles.leftSide}>
            <AdminMenu activeIndex={3} />
          </div>
          <div className={styles.rightSide}>
            <div className={styles.add}>
              <h2>Добавить товар</h2>
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
                onClick={handleSubmit}
                size="large"
                variant="contained"
              >
                Добавить
              </Button>
              <Menu
                fullWidth
                // @ts-ignore
                anchorEl={ancorEl}
                onClose={handleClose}
                open={open}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setModel("Nike Jordan 4 low");
                  }}
                >
                  Nike Jordan 4 low
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setModel("Nike Jordan 4 mid");
                  }}
                >
                  Nike Jordan 4 mid
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setModel("Nike Jordan 4 high");
                  }}
                >
                  Nike Jordan 4 high
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setModel("Nike Jordan 1 low");
                  }}
                >
                  Nike Jordan 1 low
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setModel("Nike Jordan 1 mid");
                  }}
                >
                  Nike Jordan 1 mid
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setModel("Nike Jordan 1 high");
                  }}
                >
                  Nike Jordan 1 high
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setModel("Nike Air Force 1");
                  }}
                >
                  Nike Air Force 1
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <Alert
        open={alertOpen}
        onClose={() => {
          setAlertOpen(false);
        }}
        color="success"
      >
        Фотография загружена
      </Alert>
    </div>
  );
}
