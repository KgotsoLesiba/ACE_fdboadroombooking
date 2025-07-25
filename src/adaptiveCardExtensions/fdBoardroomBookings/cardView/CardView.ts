import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
//import * as strings from 'FdBoardroomBookingsAdaptiveCardExtensionStrings';
import { QUICK_VIEW_REGISTRY_ID, QUICK_VIEW_REGISTRY_ID_BOOKINGS } from '../FdBoardroomBookingsAdaptiveCardExtension';
import { IFdBoardroomBookingsAdaptiveCardExtensionProps, IFdBoardroomBookingsAdaptiveCardExtensionState } from '../modals/types';


export class CardView extends BasePrimaryTextCardView<IFdBoardroomBookingsAdaptiveCardExtensionProps, 
IFdBoardroomBookingsAdaptiveCardExtensionState> {

  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      { //first button on the ace card
        title: 'Book a Room',
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID //the view that gets opened when the button is selected, this view/rendering is found in the json file
          }
        }
      },
      { //second button on the ace card
        title: 'View Bookings',
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID_BOOKINGS //the view that gets opened when the button is selected, this view/rendering is found in the json file
          }
        }
      }

    ];
  }

  public get data(): IPrimaryTextCardParameters {
    return {
      primaryText: `👋 Hi ${this.state.mail.split('@')[0]}`,
      description: `📅 You have ${this.state.allBookings.length} meeting(s) this week.`,
      title: this.properties.title
    };
  }
}