import React from 'react'
import { useRecordContext } from 'react-admin'
import DEFAULT_PROFILE_PIC_URL from 'constants/DEFAULT_PROFILE_PIC_URL';

const CustomerProfilePic = ({ source }) => {
  const record = useRecordContext();
  return (
    <img style={{
      maxHeight: 40,
      maxWidth: 40,
      borderRadius: '50%',
    }} src={record && record[source] ? record[source] : DEFAULT_PROFILE_PIC_URL} alt='profile' />
  )
}

export default CustomerProfilePic