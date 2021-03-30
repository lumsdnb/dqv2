import React, { useState } from 'react';
export function NameForm(props) {
  return (
    <>
      <label>
        Name:
        <input type='text' />
      </label>
      <input type='submit' value='Submit' />
    </>
  );
}
