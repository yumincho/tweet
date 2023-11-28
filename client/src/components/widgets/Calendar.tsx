import "./Calendar.css";
import "../../App.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

const Calendar = () => {
  return (
    <div className="containerItem calendar">
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey={import.meta.env.VITE_CALENDAR_API}
        height={480}
        events={{
          googleCalendarId: import.meta.env.VITE_GOOGLE_CALENDAR_ID,
        }}
        eventTextColor={"var(--color-white)"}
        eventColor={"var(--color-main-orange)"}
        eventDidMount={function (info) {
          tippy(info.el, {
            content: info.event.title,
          });
        }}
      />
    </div>
  );
};

export default Calendar;
