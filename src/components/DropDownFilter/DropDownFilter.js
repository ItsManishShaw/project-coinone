import React, { useState } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import Drawer from "@material-ui/core/Drawer";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import useWindowResize from '../../hooks/useWindowResize';
import './DropDownFilter.css';

const useStyles = makeStyles({
  paperAnchorLeft: {
    width:400
  },
  paperAnchorBottom: {
    height:500,
    borderRadius: '25px 20px 0px 0px'
  },
  fullList: {
    width: 'auto',
  },
});

const DropDownFilter = ({ filter, setFilter }) => {
  const classes = useStyles();
  const [windowWidth, windowHeight] = useWindowResize();
  const [open, setOpen] = useState(false);


  return (

    <div className="bg-white h-10 text-sm font-medium text-center flex content-center items-center pl-4">
      <div className='h-6 cursor-pointer' onClick={()=>setOpen(true)} style={{
        width: '142px',
        color: 'white',
        backgroundColor: '#2B73DE',
        border: '1.5px solid #2B73DE',
        borderRadius: '22px'
      }}>
           
        <div className="flex ml-auto w-full justify-end">
          <div className="text-center mx-auto">{filter}</div><ArrowDropDownIcon className={open ? 'transform rotate-180' : ''} />
          </div>
        <Drawer
          classes={{
            paperAnchorLeft:classes.paperAnchorLeft,
            drawer: classes.drawer,
            paperAnchorBottom: classes.paperAnchorBottom, // class name, e.g. `classes-nesting-root-x`
          }}
          anchor={windowWidth > 767 ? 'left' : 'bottom'} open={open}>
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div className="h-full">
      < FormControl component="fieldset" >
                <FormLabel ><h1 className="text-black text-xl font-semibold text-center mb-5 mt-5" style={{
        fontFamily:'Segoe UI'
      }}> Activities during which time is shown ?</h1></FormLabel>
                <RadioGroup aria-label="Filter" name="Filter" value={filter} onChange={(e) => { setFilter(e.target.value);setOpen(false) }}>
                  <div className="px-8 flex flex-col " >
                    <FormControlLabel labelPlacement="start" value="All" control={<Radio />} label={<><h1 className="mr-auto w-full text-left block text-black text-base font-semibold">All</h1><p className=" block mb-3 text-left mr-auto ">
                      Activities during class-time, study-time and play time are shown.</p></>} />
        <Divider/>
        <FormControlLabel labelPlacement="start" value="Class-time only" control={<Radio />} label={<><h1 className="mt-3 text-black text-base font-semibold">Class-time only</h1><p className="mb-3">Only the activities during the times you scheduled as class-time are shown.</p></>}/>
        <Divider/>
        <FormControlLabel labelPlacement="start" value="Study-time only" control={<Radio />} label={<><h1 className="mt-3 text-black text-base font-semibold">Study-time only</h1><p className="mb-3">Only the activities during the times you scheduled as study-time or when manually switched to study-mode from the mode page are shown.</p></>} />
        <Divider/>
                    <FormControlLabel labelPlacement="start" value="Free-time only"  control={<Radio />} label={<><h1 className="mt-3 text-black text-base font-semibold">Free-time only</h1><p className="mb-3">Only the activities during the times you scheduled as free-time or when manually switched to free-mode from the mode page are shown.are shown.</p></>} />
                  </div>
        </RadioGroup>
              </FormControl>
              </div>
    </ClickAwayListener>
          </Drawer>
      </div>
      </div>
  )
}

export default DropDownFilter;
