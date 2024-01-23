

import React, { useState } from 'react';
import './value.css';
import data from '../../utils/accordion';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { MdOutlineArrowDropDown } from 'react-icons/md';

export default function Value() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleAccordionChange = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <section className="v-wrapper">
      <div className="flexCenter paddings innerWidth v-container ">
        <div className="v-left">
          <div className="image-container">
            <img src="./images/value.png" alt="" className="image" />
          </div>
        </div>

        <div className=" flexColStart v-right">
          <span className="orangeText"> Our Value</span>
          <span className="primaryText  ">Value We Give to You </span>
          <span className="secondaryText">
            We always ready to help by providing the best services for you.
            <br />
            We believe a good place to live can make your life better
          </span>

          <Accordion
            className="c1"
            allowMultipleExpanded={false}
            preExpanded={[0]}
            onChange={handleAccordionChange}
          >
            {data.map((item, i) => (
              <AccordionItem
                className={`accordionItem ${
                  expandedIndex === i ? 'expanded' : 'collapsed'
                }`}
                key={i}
                uuid={i}
              >
                <AccordionItemHeading>
                  <AccordionItemButton className="flexCenter accordionButton">
                    <div className="flexCenter icon">{item.icon}</div>
                    <span className="primaryText">{item.heading}</span>
                    <div className="flexCenter icon">
                      <MdOutlineArrowDropDown size={20} />
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <p className="secondaryText">{item.detail}</p>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

