import { Field, FieldArray, Formik, useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react';

const initialValues = {
  title: "",
  shortDescription: "",
  symptoms: [],
  faq: [],
  longDescription: ""
}

const DataFillingForm = () => {

  const editor = useRef(null)


  return (
    <div className='max-w-6xl mx-auto flex flex-col gap-10'>

      <Formik initialValues={initialValues} onSubmit={(values) => {
        console.log(values)
      }}>
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className='bg-gray-200 flex flex-col justify-center items-center p-10 gap-5'>
              <p className='font-bold text-2xl text-green-700'>Data Filling Form</p>
              <div>
                <p className='font-bold'>Title</p>
                <input
                  type="text"
                  placeholder='Enter Title'
                  name='title'
                  value={values.title}
                  onChange={handleChange}
                  className='border-2 border-gray-700 rounded-xl w-[300px] h-[45px] p-3 focus:outline-none focus:ring-2 focus:ring-green-500'
                />
              </div>

              <div>
                <p className='font-bold'>Short Description</p>
                <input
                  type="text"
                  placeholder='Short Description'
                  className='border-2 border-gray-700 w-[300px] rounded-xl h-[45px] p-3 focus:outline-none focus:ring-2 focus:ring-green-500'
                  name='shortDescription'
                  value={values.shortDescription}
                  onChange={handleChange}
                />
              </div>

              <div>
                <p className='font-bold'>Symptoms</p>
                <FieldArray name="symptoms">
                  {({ push, remove }) => (
                    <div>
                      {values?.symptoms?.map((symptom, index) => (
                        <div key={index}>
                          <Field
                            name={`symptoms.${index}`}
                            placeholder="Enter symptom"
                          />
                          <button type="button" onClick={() => remove(index)}>
                            Remove
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => push("")}>
                        Add Symptom
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <div>
                <p className='font-bold'>FAQ</p>
                <FieldArray name='faq'>
                  {({ push, remove }) => (
                    <div>
                      {values?.faq?.map((faqEntry, index) => (
                        <div key={index}>
                          <div>
                            <p className='font-bold'>Title</p>
                            <Field
                              type='text'
                              placeholder='Enter Title'
                              name={`faq.${index}.title`}
                              className='border-2 border-gray-700 rounded-xl w-[300px] h-[45px] p-3'
                            />
                          </div>
                          <div>
                            <p className='font-bold'>Value</p>
                            <Field
                              type='text'
                              placeholder='Enter Value'
                              name={`faq.${index}.value`}
                              className='border-2 border-gray-700 rounded-xl w-[300px] h-[45px] p-3'
                            />
                          </div>
                          <button type='button' onClick={() => remove(index)}>
                            Remove FAQ
                          </button>
                        </div>
                      ))}
                      <button type='button' onClick={() => push({ title: '', value: '' })}>
                        Add FAQ
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <div>
                <p className='font-bold'>Long Description</p>

                <Field name="longDescription">
                  {({ field }) => (
                    <JoditEditor
                      value={values.longDescription}
                      onChange={(value) =>
                        handleChange({
                          target: {
                            name: "longDescription",
                            value: value
                          }
                        })
                      }
                    />
                  )}
                </Field>
                {values.longDescription}
              </div>

              <div>
                <button
                  type='submit'
                  className='w-[100px] h-[45px] bg-green-700 rounded-xl font-semibold text-white'>Save Data</button>
              </div>
            </div>
          </form>
        )}

      </Formik>
    </div>
  )
}

export default DataFillingForm