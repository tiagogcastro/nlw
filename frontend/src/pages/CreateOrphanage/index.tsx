import './styles.css';

import React, { useState } from "react";
import * as Yup from 'yup';

import { useNavigate } from "react-router-dom";

import { FiPlus } from "react-icons/fi";

import {Sidebar} from "../../components/Sidebar";
import { Input } from '../../components/Input';
import { MapMarker } from '../../components/Leaflet/MapMarker';

import { GeoLocation, LeafletOrphanagesMap } from '../../components/Leaflet';
import { Textarea } from '../../components/Textarea';
import { getValidationErrors } from '../../utils/yupGetValidation';
import { useForm } from '../../hooks/useForm';
import { Form } from '../../components/Form';
import { api } from '../../services/api';

export type MapMarkerProps = {
  position: GeoLocation | null;
}

export type CreateOrphanageData = {
  latitude?: number | null;
  longitude?: number | null;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images?: File[] | null;
}

const validationYupSchema = Yup.object({
  name: Yup.string()
    .max(24, "Máximo de 24 caracteres")
    .required("Este campo é obrigatório"),
  about: Yup.string()
    .max(300, "Máximo de 300 caracteres")
    .required("Este campo é obrigatório"),
  latitude: Yup.number()
    .nullable()
    .required("Selecione o local no mapa"),
  longitude: Yup.number()
    .nullable()
    .required("Selecione o local no mapa"),
  instructions: Yup.string()
    .required("Este campo é obrigatório"),
  opening_hours: Yup.string()
    .required("Este campo é obrigatório"),
  open_on_weekends: Yup.boolean()
    .required("Este campo é obrigatório"),
  images: Yup.mixed()
    .required('Mínimo de 1 imagem')
});

export function CreateOrphanage() {
  const pageNavigate = useNavigate();  

  const [position, setPosition] = useState<GeoLocation | null>(null);
  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const { values, errors, setErrors } = useForm<CreateOrphanageData>({
    initialValues: {
      latitude: position?.lat,
      longitude: position?.lng,
      name: '',
      about: '',  
      instructions: '',
      opening_hours: '',
      open_on_weekends,
      images: null,
    },
  });

  async function validation() {
    try {
      await validationYupSchema.validate(values, {
        abortEarly: false
      });

      return values;
    } catch(error: any) {
      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        setErrors(errors);
      }
    }
  };

  async function handleSubmit() {
    const data = await validation();

    try {
      if(data) {
        const formdata = new FormData();

        formdata.append('name', data.name)
        formdata.append('about', data.about)
        formdata.append('latitude', String(data.latitude))
        formdata.append('longitude', String(data.longitude))
        formdata.append('instructions', data.instructions)
        formdata.append('opening_hours', data.opening_hours)
        formdata.append('open_on_weekends', String(data.open_on_weekends))
        
        if(data.images) {
          const images_array = Array.from(data.images);

          images_array?.forEach(image => {
            formdata.append('images', image);
          });
        }

        const response = await api.post('orphanages', formdata);
        
        pageNavigate(`/orphanages/${response.data.id}`);

      }
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <Form
          onSubmit={handleSubmit}
          className="create-orphanage-form"
        >
          <fieldset>
            <legend>Dados</legend>

            <LeafletOrphanagesMap
              style={{ width: '100%', height: 280 }}
            >
              <MapMarker setErrors={setErrors} setPosition={setPosition} getCurrentLocation={false} />
            </LeafletOrphanagesMap>
            {errors?.latitude && errors?.longitude && (
              <p className="input_error_text">{errors.latitude || errors.longitude}</p>
            )}

            <Input
              name='name'
              labelText={'Nome'}
            />

            <Textarea
              name="about"
              maxLength={300}
              labelText={<>Sobre <span>Máximo de 300 caracteres</span></>}
            />    
            
            <Input
              type="file"
              name="images"
              labelText='Fotos'
              multiple
              files={{
                itens: images,
                setFiles: setImages,
                setFilesPreview: setPreviewImages
              }}
            >
              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} />
                  )
                })}
                <label htmlFor="images" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
            </Input>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <Textarea
              name="instructions"
              labelText={'Instruções'}
            />

            <Input
              name='opening_hours'
              labelText={'Horário de funcionamento'}
            />

            <Input
              name="open_on_weekends" 
              labelText={'Funciona no fim de semana'}
              hasField={false}
            >
              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}>
                  Sim
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}>
                    Não
                </button>
              </div>
            </Input>
          </fieldset>

          <button className="confirm-button" type="submit" >
            Confirmar
          </button>
        </Form>
      </main>
    </div>
  );
}