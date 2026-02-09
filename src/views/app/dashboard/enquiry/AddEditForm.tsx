import { useState } from 'react'
import Grid from '@mui/material/Grid'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import type { FC } from 'react'
import { Alert } from '@mui/material'

interface Authordata {
  olddata?: any
  isAddMode: boolean
}

const AddEditForm: FC<Authordata> = ({ olddata, isAddMode }) => {
  const [error] = useState('')
  const hasValue = (val: any) => val !== undefined && val !== null && val !== ''
  const schema: any = yup.object().shape({})
  const formatDateTime = date =>
    date
      ? new Date(date).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true // Optional: for 12-hour format (AM/PM)
        })
      : 'N/A'
  const defaultValues = {
    name: isAddMode ? '' : olddata.name,
    email: isAddMode ? '' : olddata.email,
    exam: isAddMode ? '' : olddata.exam,
    category: isAddMode ? '' : olddata.category,
    gender: isAddMode ? '' : olddata.gender,
    rank: isAddMode ? '' : olddata.rank,
    contact_number: isAddMode ? '' : olddata.contact_number,
    location: isAddMode ? '' : olddata.location,
    course_in_mind: isAddMode ? '' : olddata.course_in_mind,
    college_name: isAddMode ? '' : olddata.college_name,
    school_name: isAddMode ? '' : olddata.school_name,
    created_at: isAddMode ? '' : olddata?.created_at,
    current_url: isAddMode ? 'Draft' : olddata.current_url,
    description: isAddMode ? 'Draft' : olddata.description
  }

  const {
    control,
    formState: { errors }
  } = useForm<any>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  return (
    <>
      <form encType='application/x-www-form-urlencoded'>
        <Grid container spacing={5}>
          {hasValue(defaultValues.name) && (
            <Grid item xs={12} sm={4}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Name'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.name)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.name && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          )}
          {hasValue(defaultValues.email) && (
            <Grid item xs={12} sm={4}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    type='email'
                    label='Email'
                    onChange={onChange}
                    placeholder='example@mail.com'
                    error={Boolean(errors.email)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.email && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          )}

          {hasValue(defaultValues.contact_number) && (
            <Grid item xs={12} sm={4}>
              <Controller
                name='contact_number'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    // type='number'
                    label='Contact Number'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.contact_number)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.contact_number && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          )}

          {hasValue(defaultValues.location) && (
            <Grid item xs={12} sm={4}>
              <Controller
                name='location'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Location'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.location)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.location && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          )}

          {hasValue(defaultValues.course_in_mind) && (
            <Grid item xs={12} sm={4}>
              <Controller
                name='course_in_mind'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Course_in_mind'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.course_in_mind)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.course_in_mind && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          )}

          {hasValue(defaultValues.college_name) && (
            <Grid item xs={12} sm={4}>
              <Controller
                name='college_name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='College_name'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.college_name)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.college_name && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          )}

          {hasValue(defaultValues.school_name) && (
            <Grid item xs={12} sm={4}>
              <Controller
                name='school_name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='School_name'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.school_name)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.school_name && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          )}
          {/* ----exam,gender,rank,category */}
          {/* exam */}

          {hasValue(defaultValues.exam) && (
            <Grid item xs={12} sm={4}>
              <Controller
                name='exam'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='exam'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.exam)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.exam && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          )}
          {/* gender */}
          {hasValue(defaultValues.gender) && (
            <Grid item xs={12} sm={4}>
              <Controller
                name='gender'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='gender'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.gender)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.gender && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          )}
          {/* rank */}
          {hasValue(defaultValues.rank) && (
            <Grid item xs={12} sm={4}>
              <Controller
                name='rank'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='rank'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.rank)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.rank && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          )}
          {/* category */}
          {hasValue(defaultValues.category) && (
            <Grid item xs={12} sm={4}>
              <Controller
                name='category'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='category'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.category)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.category && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={4}>
            <Controller
              name='created_at'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={formatDateTime(value)}
                  label='Created Time'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.created_at)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.created_at && { helperText: 'This field is required' })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name='current_url'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  multiline
                  rows={3}
                  label='Current_url'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.current_url)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.current_url && { helperText: 'This field is required' })}
                />
              )}
            />
          </Grid>
          {hasValue(defaultValues.description) && (
            <Grid item xs={12} sm={4}>
              <Controller
                name='description'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    multiline
                    rows={3}
                    label='Message'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.description)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.description && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            {error && <Alert severity='error'>{error}</Alert>}
          </Grid>

          {/* <Grid item xs={12}>
                        <DialogActions
                            sx={{
                                justifyContent: 'center',
                                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                            }}
                        >

                            <Button variant='contained' type='submit' sx={{ mr: 1 }} >
                                Update
                                {loading ? (
                                    <CircularProgress
                                        sx={{
                                            color: 'common.white',
                                            width: '20px !important',
                                            height: '20px !important',
                                            mr: theme => theme.spacing(2)
                                        }}
                                    />
                                ) : null}
                            </Button>

                        </DialogActions>
                    </Grid> */}
        </Grid>
      </form>
    </>
  )
}

export default AddEditForm
