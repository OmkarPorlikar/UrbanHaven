import React from 'react'
import { useMutation } from 'react-query'
import { TextInput , Group , Button  , Box, NumberInput} from '@mantine/core'
import { useForm } from '@mantine/form'
import { createResidency } from '../../utils/api'
import { useMyContext } from '../../Context/Contex'
import { toast } from 'react-toastify'
import useProperties from '../../Hooks/useProperties.js'
export default function Facilities({prevStep , propertyDetails , setPropertyDetails , setOpened , setActiveStep}) {

const {user} = useMyContext();
const { refetch: refetchProperties } = useProperties();
const email = user?.tokenObject?.email;
console.log(user?.tokenObject?.email)
    const form = useForm({
        initialValues: {
          bedrooms: propertyDetails.facilities.bedrooms,
          parkings: propertyDetails.facilities.parkings,
          bathrooms: propertyDetails.facilities.bathrooms,
        },
        validate: {
          bedrooms: (value) => (value < 1 ? "Must have atleast one room" : null),
          bathrooms: (value) =>
            value < 1 ? "Must have atleast one bathroom" : null,
        },
      });


    const {mutate , isLoading} = useMutation({
        mutationFn: ()=> createResidency({...propertyDetails , facilities:{ bedrooms , parkings ,bathrooms }} , user?.token),
        onSuccess: ()=>{
            toast.success('Property has been added !')
            setPropertyDetails({
                title: "",
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
    userEmail: email,
            })
            setOpened(false)
            setActiveStep(0)
            refetchProperties()
        },   
    onError: ()=> toast.error("Cannot add Property !, Try again")
    })



const {bedrooms, parkings,bathrooms  }  = form.values;

    const handleSubmit = () =>{
        const {hasError} = form.validate()
        if(!hasError){
        setPropertyDetails((prev) =>( {...prev , facilities:{ bedrooms , parkings ,bathrooms }}))
        }
mutate();
    }

  return (
   
    <Box  mx="auto" my="md"> 
    <form className='flexColCenter'
    onSubmit={(e)=>{
        e.preventDefault()
        handleSubmit()
    }}
    >
     
     <NumberInput
    label="No. of Beadroom"
    withAsterisk
    w={"50%"}
    placeholder='beadroom...'
    {...form.getInputProps("bedrooms")}
    />

<NumberInput
    label="No. of  Parkings"
    withAsterisk
    w={"50%"}
    placeholder='Parkings...'
    {...form.getInputProps("parkings")}
    />
    <NumberInput
    label="No. of  Bathrooms"
    withAsterisk
    w={"50%"}
    placeholder='bathrooms...'
    {...form.getInputProps("bathrooms")}
    />
    <Group position="center" mt="xl">
        <Button variant='default' onClick={prevStep}> Back </Button>
        <Button type='submit' color='green' disabled={isLoading}>  
        {isLoading ? "Submitting" : "Add Property"}
        </Button>
    </Group>
    </form>

    </Box>
  )
}
