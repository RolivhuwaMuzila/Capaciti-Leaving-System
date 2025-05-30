import React from 'react';

const AnimatedShapes = () => {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.shape, top: '20%', left: '10%' }} />
      <div style={{ ...styles.shape, top: '50%', left: '80%' }} />
      <div style={{ ...styles.shape, top: '75%', left: '25%' }} />
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    zIndex: 1,
  },
  shape: {
    position: 'absolute',
    width: '80px',
    height: '80px',
    backgroundColor: '#ffd1d1',
    borderRadius: '50%',
    animation: 'float 6s ease-in-out infinite',
  },
};

export default AnimatedShapes;
