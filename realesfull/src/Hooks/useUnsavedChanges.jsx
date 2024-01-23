import React, { useState, useEffect } from 'react';

function useUnsavedChangesWarning() {
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (unsavedChanges) {
        const message = "You have unsaved changes. Do you really want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [unsavedChanges]);

  const showUnsavedChangesWarning = () => {
    setUnsavedChanges(true);
  };

  const hideUnsavedChangesWarning = () => {
    setUnsavedChanges(false);
  };

  return { unsavedChanges, setUnsavedChanges };
}

export default useUnsavedChangesWarning;
