
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getIcons,getSocialIcons,getWallpapers,getBackgroundImage } from './model.js';
import { getBreakfastMenu,getBreakfastItem,getDinnerMenu,getDinnerItem,getSoftdrinkMenu,getSoftdrinkItem,getLunchMenu,getLunchItem,getKienyejiMenu,getKienyejiItem,getAllMenu } from './model.js';


export async function homePage(request,response){
  const icons = await getIcons();
  const wallpapers = await getWallpapers();
  const sicon = await getSocialIcons();
  const background = await getBackgroundImage();
  response.render(`homepage`,{icons:icons,wallpapers:wallpapers,sicon:sicon,background:background});
}

export async function reservationPage(request,response){
  response.render(`reservation`,{});
}
export async function completeReservationPage(request,response){
  response.render(`completereservation`,{});
}

export async function displayMenu(request,response){
  const allMenu = await getAllMenu()
  response.render(`menu`,{allMenu:allMenu});
 }
 export async function getBreakfast(request,response){
  const id = parseInt(request.params.id,10);
  let food;
  if(!id) {
   food = await getBreakfastItem();
  }else{
    food = await getBreakfastItem(id);
  }
  const item = food;
  const menu = await getBreakfastMenu();
  const icons = await getIcons();
  //console.log(item);
  response.render(`index`,{item: item,menu:menu,icons:icons});
}

export async function getSoftdrinks(request,response){
  const id = parseInt(request.params.id,10);
  let food;
  if(!id) {
   food = await getSoftdrinkItem();
  }else{
    food = await getSoftdrinkItem(id);
  }
  const item = food;
  const menu = await getSoftdrinkMenu();
  const icons = await getIcons();
 // console.log(item);
  response.render(`index`,{item: item,menu:menu,icons:icons});
}

export async function getLunch(request,response){
  const id = parseInt(request.params.id,10);
  let food;
  if(!id) {
   food = await getLunchItem();
  }else{
    food = await getLunchItem(id);
  }
  const item = food;
  const menu = await getLunchMenu();
  const icons = await getIcons();
  //console.log(item);
  response.render(`index`,{item: item,menu:menu,icons:icons});
}

export async function getDinner(request,response){
  const id = parseInt(request.params.id,10);
  let food;
  if(!id) {
   food = await getDinnerItem();
  }else{
    food = await getDinnerItem(id);
  }
  const item = food;
  const menu = await getDinnerMenu();
  const icons = await getIcons();
  //console.log(item);
  response.render(`index`,{item: item,menu:menu,icons:icons});
}

export async function getKienyeji(request,response){
  const id = parseInt(request.params.id,10);
  let food;
  if(!id) {
   food = await getKienyejiItem()
  }else{
    food = await getKienyejiItem(id);
  }
  const item = food;
  const menu = await getKienyejiMenu();
  const icons = await getIcons();
  //console.log(item);
  response.render(`index`,{item: item,menu:menu,icons:icons});
}