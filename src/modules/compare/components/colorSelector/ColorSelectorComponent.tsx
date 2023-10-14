import { useEffect, useState } from "react";
import "./ColorsSelectorComponent.scss";
import ColorPickerIcon from "../../../../assets/color_palette.svg";

export interface Palette {
  name: string;
  colorCodePrimary: string;
  colorCodeSecondary: string;
  className: string;
}

interface ColorSelectorComponentProps {
  setDiffColor: (color: Palette, insertionColors: boolean) => void;
  insertionTab: boolean;
}

const ColorSelectorComponent = (props: ColorSelectorComponentProps) => {
  const { setDiffColor, insertionTab } = props;

  const palette: Palette[] = [
    {
      name: "Ruby",
      className: "color-ruby",
      colorCodePrimary: "#D8334A",
      colorCodeSecondary: "rgb(216,51,74)",
    },
    {
      name: "Grape",
      className: "color-grapefruit",
      colorCodePrimary: "#ED5565",
      colorCodeSecondary: "rgb(237,85,101)",
    },
    {
      name: "Bitter-Sweet",
      className: "color-bittersweet",
      colorCodePrimary: "#FC6E51",
      colorCodeSecondary: "rgb(252,110,81)",
    },
    {
      name: "Sunflower",
      className: "color-sunflower",
      colorCodePrimary: "#FFCE54",
      colorCodeSecondary: "rgb(255,206,84)",
    },
    {
      name: "Straw",
      className: "color-straw",
      colorCodePrimary: "#E8CE4D",
      colorCodeSecondary: "rgb(232,206,77)",
    },
    {
      name: "Grass",
      className: "color-grass",
      colorCodePrimary: "#A0D468",
      colorCodeSecondary: "rgb(160,212,104)",
    },
    {
      name: "Teal",
      className: "color-teal",
      colorCodePrimary: "#A0CECB",
      colorCodeSecondary: "rgb(160,206,203)",
    },
    {
      name: "Aqua",
      className: "color-aqua",
      colorCodePrimary: "#4FC1E9",
      colorCodeSecondary: "rgb(79,193,233)",
    },
    {
      name: "Ocean",
      className: "color-blue-jeans",
      colorCodePrimary: "#5D9CEC",
      colorCodeSecondary: "rgb(93,156,236)",
    },
    {
      name: "Plum",
      className: "color-plum",
      colorCodePrimary: "#8067B7",
      colorCodeSecondary: "rgb(128,103,183)",
    },
    {
      name: "Lavender",
      className: "color-lavender",
      colorCodePrimary: "#AC92EC",
      colorCodeSecondary: "rgb(172,146,236)",
    },
    {
      name: "Rose Mary",
      className: "color-pink-rose",
      colorCodePrimary: "#EC87C0",
      colorCodeSecondary: "rgb(236,135,192)",
    },
    {
      name: "Dark Gray",
      className: "color-dark-gray",
      colorCodePrimary: "#656D78",
      colorCodeSecondary: "rgb(101,109,120)",
    },
    {
      name: "Charcoal",
      className: "color-charcoal",
      colorCodePrimary: "#3C3B3D",
      colorCodeSecondary: "rgb(60,59,61)",
    },
    {
      name: "Light Grey",
      className: "color-charcoal",
      colorCodePrimary: "#F5F7FA",
      colorCodeSecondary: "rgb(245,247,250)",
    },
    {
      name: "Medium Grey",
      className: "color-charcoal",
      colorCodePrimary: "#CCD1D9",
      colorCodeSecondary: "rgb(204,209,217)",
    },
  ];

  const [activeColor, setActiveColor] = useState(
    palette.findIndex((e) => e.name === "Lavender")
  );
  const [activeColor2, setActiveColor2] = useState(
    palette.findIndex((e) => e.name === "Ocean")
  );

  function setColors(color: Palette, index: number) {
    setDiffColor(color, insertionTab);
    if (!insertionTab) {
      setActiveColor(index);
    } else {
      setActiveColor2(index);
    }
  }

  function isActive(index: number) {
    if (insertionTab && activeColor2 == index) return true;
    if (!insertionTab && activeColor == index) return true;
    return false;
  }

  useEffect(() => {
    setColors(
      palette[insertionTab ? activeColor2 : activeColor],
      insertionTab ? activeColor2 : activeColor
    );
  });

  return (
    <>
      <div className="picker-w">
        {/* PICKER ICON */}
        <div className="picker">
          <div className="picker-icon-w">
            <img className="cp-svg" src={ColorPickerIcon} alt="" />
          </div>
        </div>

        {/* PALETTE */}
        <div className="colors-w">
          {palette.map((swatch, index) => (
            <div
              key={swatch.name}
              className={`color ${isActive(index) ? "active" : ""}`}
              onClick={() => {
                setColors(swatch, index);
              }}
            >
              <div
                className="color-box color-primary"
                style={{ backgroundColor: `${swatch.colorCodePrimary}` }}
              ></div>
              <div
                className="color-box color-secondary"
                style={{ backgroundColor: `${swatch.colorCodeSecondary}` }}
              ></div>
            </div>
          ))}
          <div className="info">
            {palette[insertionTab ? activeColor2 : activeColor].name}
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorSelectorComponent;
