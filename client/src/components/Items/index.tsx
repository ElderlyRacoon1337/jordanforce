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
              divider
              onClick={() => {
                handleClose();
                setModel("Nike Jordan 4");
              }}
            >
              Nike Jordan 4
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
              <Item
                key={i}
                title={el.title}
                images={el.images}
                id={el._id}
                price={el.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
