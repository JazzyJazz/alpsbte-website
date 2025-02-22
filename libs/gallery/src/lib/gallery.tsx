/* eslint-disable*/
import './gallery.scss';
import { PageTitle } from '@alpsbte/shared/components';
import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { languageStore } from '@alpsbte/shared/stores';
import { tr } from '@alpsbte/shared/language';
import { Button } from '@alpsbte/shared/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { recordAnnotationApplied } from 'mobx/dist/internal';


export interface GalleryProps {}
// git test
export const Gallery: React.FC = inject(languageStore.storeKey)(
  observer(({}: GalleryProps) => {
    const places = {
      basel: 'Basel',
      graz: 'Graz',
      luzern: 'Luzern',
      oesterreich: 'Österreich',
      salzburg: 'Salzburg',
      schweiz: 'Schweiz',
      wien: 'Wien',
    } as const;

    const [place, setPlace] = useState('basel');
    const [dropDown, setDropDown] = useState(false);

    const changePlace = (newPlace: string) => {
      setPlace('loading');
      setTimeout(() => {
        setPlace(newPlace);
      }, 50);
    };
    return (
      <div>
        <PageTitle
          title={tr('pages.gallery.title')}
          subtitle={tr('pages.gallery.description')}
        />
        <div className="gallery__button-group">
          {Object.keys(places).map((placeKey: string) => {
            return (
              <Button
                label={places[placeKey as keyof typeof places]}
                style={{
                  color: placeKey === place ? '#fff' : '#6D6D6D',
                  backgroundColor: placeKey === place ? '#6D6D6D' : 'unset',
                  borderColor: '#6D6D6D',
                  marginBottom: '10px',
                }}
                size="lg"
                onClick={() => changePlace(placeKey)}
              />
            );
          })}
        </div>
        <div className="gallery__dropdown">
          <button
            className="gallery__dropdown__button"
            onClick={() => setDropDown(!dropDown)}
          >
            {places[place as keyof typeof places]}
            <span className="gallery__dropdown__button__icon" >
                  <FontAwesomeIcon icon={faCaretDown} size="lg" style={{transform: dropDown ? "rotate(-180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease-in-out"}} />

            </span>
          </button>
          <div
            className="gallery__dropdown__content"
            style={{ display: dropDown ? 'flex' : 'none'}}
          >
            {Object.keys(places).map((placeKey: string) => {
              return (
                <p
                  onClick={() => {
                    changePlace(placeKey);
                    setDropDown(false);
                  }}
                >
                  {console.log(places[placeKey as keyof typeof places])}
                  {places[placeKey as keyof typeof places]}
                  
                
                </p>
              );
            })}
          </div>
        </div>

        <div className="gallery__container">
          <div className="gallery__image-container">
            {[...Array(9)].map((_, i) => (
              <img
                src={`http://localhost:3333/api/assets/gallery/${place}/${
                  place == 'loading' ? '0' : i
                }.webp`}
                className="gallery__image"
                alt={`Image in ${place}`}
              ></img>
            ))}
          </div>
        </div>
      </div>
    );
  })
);

export default Gallery;
