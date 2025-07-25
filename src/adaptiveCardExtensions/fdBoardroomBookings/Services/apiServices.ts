import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from "@microsoft/sp-http";
import { IViewBooking } from "../modals/types";
import { __metadata } from "tslib";
//import { Title } from "FdBoardroomBookingsAdaptiveCardExtensionStrings";

//The function that is going to be used to submit the form, when a user clicks Submit, it will trigger this function and Post it on SP
export const postBooking = async ( 
      spHttpClient: SPHttpClient, 
      absoluteUrl: string, 
      title: string, 
      mail: string,
      officeLocation: any, 
      roomName: string, 
      startDate: string, 
      startTime: string, 
      endDate: string, 
      endTime: string
    ): Promise<void> => {
      try {
        const listName = 'BoardroomBookings';
        const endPoint = `${absoluteUrl}/_api/web/lists/getByTitle('${listName}')/items`;
        const StartDateTime = `${startDate}T${startTime}`;
        const endDateTime = `${endDate}T${endTime}`;
        const body: ISPHttpClientOptions = {
            headers: {      
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            },
            body: JSON.stringify({
              '__metadata': { type: 'SP.Data.BoardroomBookingsListItem' }, // Ensure the correct type is set
                Title: title,
                Email: mail,
                RoomName: roomName,
                StartDateTime: StartDateTime,
                EndDateTime: endDateTime,
                OfficeLocation: officeLocation
            }),
        };

        console.log(body.body)
        
        const response: SPHttpClientResponse = await spHttpClient.post(
            endPoint,
            SPHttpClient.configurations.v1,
            body
        );

        console.log(listName)

        
        if (!response.ok) {
            throw new Error(`Failed to post booking: ${response.statusText}`);
            }

            console.log("Booking successfully posted.");
        
    } catch (error) {
        console.error("An error occurred: ",error)
        throw error;
    }
}

export const getBookings = async (
spHttpClient: SPHttpClient, absoluteUrl: string, mail: string, startDate: string, startTime: string, endDate: string, endTime: string): Promise<IViewBooking[]> => {
  try {
    const listName = 'BoardroomBookings';
    const today = new Date().toISOString();
    const filter = `Email eq '${mail}' and StartDateTime ge datetime'${today}'`;
    const endpoint = `${absoluteUrl}/_api/web/lists/getByTitle('${listName}')/items?$filter=${filter}&$orderby=StartDateTime asc`;

    const response: SPHttpClientResponse = await spHttpClient.get(
      endpoint,
      SPHttpClient.configurations.v1
    );
    console.log("Fetching URL:", endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch bookings: ${response.statusText}`);
    }

    const json = await response.json();
    const bookings: IViewBooking[] = json.value;
    return bookings;

  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};
