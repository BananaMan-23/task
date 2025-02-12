import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openFooterPopup,
  closeFooterPopup,
  setSelectedValue,
} from "../../Redux/slice/footerPopupSlice";
import ContainerConfig from "../../UI/ContainerConfig/ContainerConfig";
import OpenDropButton from "../../UI/OpenDropButton/OpenDropButton";
import SelectMenu from "../SelectMenu/SelectMenu";
import ToggleButton from "../../UI/ToggleButton/ToggleButton";
import ButtonContinue from "../../UI/ButtonContinue/ButtonContinue";
import style from "./Footer.module.css";

function Footer({ onContinue }) {
  const dispatch = useDispatch();
  const footerPopupState = useSelector((state) => state.footerPopup);
  const formData = useSelector((state) => state.form.data);
  const selectedValues = useSelector((state) => state.popup.selectedValues);
  const FooterselectedValues = useSelector(
    (state) => state.footerPopup.selectedValues
  );
  const initialFooterValues = [
    {
      title: "Payment Timeout",
      value: "15 minutes",
      options: [
        "15 minutes",
        "30 minutes",
        "45 minutes",
        "1 hour",
        "2 hours",
        "3 hours",
      ],
      span: "Select Payment Timeout",
    },
  ];

  const [localValue, setLocalValue] = useState(initialFooterValues);

  const handleOpenPopup = (item) => {
    dispatch(openFooterPopup(item));
  };

  const handleSelectChange = (newValue) => {
    const updatedList = localValue.map((container) => {
      if (container.title === footerPopupState.data.title) {
        return { ...container, value: newValue };
      }
      return container;
    });
    setLocalValue(updatedList);
    dispatch(
      setSelectedValue({ title: footerPopupState.data.title, value: newValue })
    );
    dispatch(closeFooterPopup());
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue(formData);
      console.log(selectedValues);
      console.log(FooterselectedValues);
    } else {
      console.log(formData);
    }
  };

  return (
    <div className={style.footer__container}>
      {localValue.map((item, index) => (
        <ContainerConfig
          key={index}
          title={`${item.title} ${" / "}`}
          value={item.value}
        >
          <OpenDropButton onClick={() => handleOpenPopup(item)} />
        </ContainerConfig>
      ))}
      {footerPopupState.isOpen && (
        <SelectMenu
          title={footerPopupState.data.title}
          span={footerPopupState.data.span}
          menuList={footerPopupState.data.options}
          onSelectChange={handleSelectChange}
          selectedValue={
            localValue.find(
              (container) => container.title === footerPopupState.data.title
            )?.value
          }
        />
      )}
      <ContainerConfig title={"Round Order Amount"}>
        {" "}
        <ToggleButton />
      </ContainerConfig>
      <p className={style.footer__span}>
        Amount will be rounded down. Ex.: for a transaction of 1045.85 RUB. you
        will receive 1045 RUB.
      </p>
      <ButtonContinue onClick={handleContinue}>Continue</ButtonContinue>
    </div>
  );
}

export default Footer;
