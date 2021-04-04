import React, { useState } from "react";
import Avatar from "avataaars";
import { MdLoop } from "react-icons/md";

const AvatarGen = (props) => {
  const [aviNum, setAviNum] = useState(-1);

  const randomAvi = () => {
    setAviNum(aviNum + 1);
    if (aviNum > 6) {
      setAviNum(0);
    }
  };

  const returnAvi = (i) => {
    if (props.canEdit) {
      props.handleAviChange(i);
    }
    switch (i) {
      case 0:
        return (
          <Avatar
            style={props.style}
            accessoriesType='Blank'
            avatarStyle='Circle'
            clotheColor='Blue03'
            clotheType='CollarSweater'
            eyeType='EyeRoll'
            eyebrowType='AngryNatural'
            facialHairColor='BlondeGolden'
            facialHairType='BeardLight'
            graphicType='Resist'
            hairColor='BlondeGolden'
            hatColor='Black'
            mouthType='Eating'
            skinColor='Light'
            topType='LongHairBun'
          />
        );
        break;
      case 1:
        return (
          <Avatar
            style={props.style}
            avatarStyle='Circle'
            topType='LongHairFrida'
            accessoriesType='Sunglasses'
            hairColor='BrownDark'
            facialHairType='Blank'
            clotheType='Overall'
            clotheColor='PastelBlue'
            eyeType='Dizzy'
            eyebrowType='RaisedExcitedNatural'
            mouthType='ScreamOpen'
            skinColor='Light'
          />
        );
        break;
      case 2:
        return (
          <Avatar
            style={props.style}
            accessoriesType='Sunglasses'
            avatarStyle='Circle'
            clotheColor='Black'
            clotheType='ShirtVNeck'
            eyeType='Hearts'
            eyebrowType='RaisedExcited'
            facialHairColor='Brown'
            facialHairType='MoustacheFancy'
            graphicType='Resist'
            hairColor='PastelPink'
            hatColor='PastelOrange'
            mouthType='Sad'
            skinColor='Black'
            topType='ShortHairDreads01'
          />
        );
        break;
      case 3:
        return (
          <Avatar
            style={props.style}
            accessoriesType='Blank'
            avatarStyle='Circle'
            clotheColor='Blue03'
            clotheType='BlazerShirt'
            eyeType='Wink'
            eyebrowType='UnibrowNatural'
            facialHairColor='Black'
            facialHairType='Blank'
            graphicType='SkullOutline'
            hairColor='Red'
            hatColor='Blue01'
            mouthType='Eating'
            skinColor='Pale'
            topType='LongHairStraightStrand'
          />
        );
        break;
      case 4:
        return (
          <Avatar
            style={props.style}
            accessoriesType='Blank'
            avatarStyle='Circle'
            clotheColor='PastelOrange'
            clotheType='BlazerShirt'
            eyeType='Happy'
            eyebrowType='Default'
            facialHairColor='Red'
            facialHairType='MoustacheMagnum'
            graphicType='SkullOutline'
            hairColor='PastelPink'
            mouthType='Serious'
            skinColor='Brown'
            topType='ShortHairShaggyMullet'
          />
        );
        break;
      case 5:
        return (
          <Avatar
            style={props.style}
            accessoriesType='Prescription02'
            avatarStyle='Circle'
            clotheColor='Red'
            clotheType='CollarSweater'
            eyeType='Squint'
            eyebrowType='UpDownNatural'
            facialHairColor='BrownDark'
            facialHairType='MoustacheFancy'
            graphicType='SkullOutline'
            hairColor='PastelPink'
            hatColor='PastelGreen'
            mouthType='Default'
            skinColor='Light'
            topType='NoHair'
          />
        );
        break;
      case 6:
        return (
          <Avatar
            style={props.style}
            accessoriesType='Blank'
            avatarStyle='Circle'
            clotheColor='PastelBlue'
            clotheType='Hoodie'
            eyeType='Dizzy'
            eyebrowType='Default'
            facialHairColor='Red'
            facialHairType='Blank'
            hairColor='Brown'
            mouthType='Vomit'
            skinColor='Pale'
            topType='ShortHairFrizzle'
          />
        );
        break;
      case 7:
        return (
          <Avatar
            style={props.style}
            accessoriesType='Blank'
            avatarStyle='Circle'
            clotheColor='PastelOrange'
            clotheType='GraphicShirt'
            eyeType='Wink'
            eyebrowType='SadConcerned'
            facialHairColor='Platinum'
            facialHairType='MoustacheFancy'
            hairColor='Blonde'
            hatColor='PastelGreen'
            mouthType='Twinkle'
            skinColor='Brown'
            topType='LongHairStraight'
          />
        );
        break;
      default:
        return (
          <Avatar
            style={props.style}
            accessoriesType='Blank'
            avatarStyle='Circle'
            clotheColor='Blank'
            clotheType=' '
            eyeType=' '
            eyebrowType=' '
            facialHairColor=' '
            facialHairType=' '
            hairColor=' '
            hatColor=' '
            mouthType=' '
            skinColor='Brown'
            topType=' '
          />
        );
        break;
    }
  };

  return (
    <div className='avi-gen-container'>
      {props.i > -1 ? returnAvi(props.i) : returnAvi(aviNum)}
      {props.canEdit ? (
        <button type='button' onClick={randomAvi} className='generate-button'>
          <MdLoop />
        </button>
      ) : null}
    </div>
  );
};

export default AvatarGen;
