import React, { useState } from "react";
import styles from "./Items.module.scss";
import { Item } from "../Item";
import { Button, Menu, MenuItem } from "cutie-ui";

export const Items = ({ sneakers }: any) => {
  const [model, setModel] = useState("Все");
  const [sortBy, setSortBy] = useState("Релевантности");

  const [ancorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(ancorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  const [ancorElSort, setAnchorElSort] = useState<HTMLElement | null>(null);
  const openSort = Boolean(ancorElSort);
  const handleCloseSort = () => {
    setAnchorElSort(null);
  };
  const handleClickSort = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorElSort(e.currentTarget);
  };
  if (!sneakers) return;

  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.menu}>
          <Menu
            className={styles.menu_el}
            fullWidth
            open={open}
            anchorEl={ancorEl}
            onClose={handleClose}
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
              divider
              onClick={() => {
                handleClose();
                setModel("Nike Air Force 1");
              }}
            >
              Nike Air Force 1
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setModel("Все");
              }}
            >
              Все
            </MenuItem>
          </Menu>
          <Menu
            className={styles.menu_el}
            fullWidth
            open={openSort}
            anchorEl={ancorElSort}
            onClose={handleCloseSort}
          >
            <MenuItem
              onClick={() => {
                handleCloseSort();
                setSortBy("Релевантности");
              }}
            >
              Релевантности
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseSort();
                setSortBy("Популярности");
              }}
            >
              Популярности
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseSort();
                setSortBy("Возростанию цены");
              }}
            >
              Возростанию цены
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseSort();
                setSortBy("Убыванию цены");
              }}
            >
              Убыванию цены
            </MenuItem>
          </Menu>
          <p>Модель:</p>
          <Button
            variant="outlined"
            color="textPrimary"
            className={styles.button}
            onClick={handleClick}
          >
            {model}
          </Button>
          <p>Сортировка по:</p>
          <Button
            variant="outlined"
            color="textPrimary"
            className={styles.button}
            onClick={handleClickSort}
          >
            {sortBy}
          </Button>
        </div>
        <div className={styles.items}>
          {sneakers.map((el: any, i: number) => {
            return (
              <Item key={i} title={el.title} images={el.images} id={el._id} />
            );
          })}
        </div>
      </div>
    </div>
  );
};
