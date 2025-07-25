import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { QuickViewBookings } from './quickView/QuickViewGet';
import { FdBoardroomBookingsPropertyPane } from './FdBoardroomBookingsPropertyPane';
import { IFdBoardroomBookingsAdaptiveCardExtensionProps, IFdBoardroomBookingsAdaptiveCardExtensionState } from './modals/types';
import { getBookings } from './Services/apiServices';

const CARD_VIEW_REGISTRY_ID: string = 'FdBoardroomBookings_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'FdBoardroomBookings_QUICK_VIEW';
export const QUICK_VIEW_REGISTRY_ID_BOOKINGS: string = 'FdBoardroomBookings_QUICK_VIEW_BOOKINGS';


export default class FdBoardroomBookingsAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IFdBoardroomBookingsAdaptiveCardExtensionProps,
  IFdBoardroomBookingsAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: FdBoardroomBookingsPropertyPane | undefined;

  public async onInit(): Promise<void> {
    this.state = {
      context: this.context,
      mail: this.context.pageContext.user.email,
      absoluteUrl: this.context.pageContext.web.absoluteUrl,
      title: '',
      boardroom: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      msgColor: '',
      submissionMsg: '',
      isVisible: false,
      allBookings: []
     };

     try {
      const bookings = await getBookings(
        this.context.spHttpClient,
        this.context.pageContext.web.absoluteUrl,
        this.context.pageContext.user.email,
        this.state.startDate || '', //Fix this part
        this.state.startTime || '', //Fix this part
        this.state.endDate || '', //Fix this part
        this.state.endTime || '' //Fix this part
      );

       this.setState({ allBookings: bookings });
       console.log('Bookings loaded:', bookings);

       console.log("📅 Bookings fetched:", bookings);
      
     } catch (error) {
      console.error("Error loading bookings:", error);
     }

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID_BOOKINGS, () => new QuickViewBookings());

    return Promise.resolve();
  }
  //Custom icon
  protected get iconProperty(): string {
  return this.properties.iconProperty || require('./assets/boardroom.png');
}

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'FdBoardroomBookings-property-pane'*/
      './FdBoardroomBookingsPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.FdBoardroomBookingsPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
