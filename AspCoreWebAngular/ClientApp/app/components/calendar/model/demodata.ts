import { IPerson, IAppointment } from './calendar.interfaces';

export var Persons: IPerson[] = [
    {
        Id: 1, Name: "Ola", Appointments: [
            {
                Id: 1, Description: "Avtale", Date: new Date(), Time: 9, Length: 1
            }
        ]
    },
    {
        Id: 2, Name: "Siri", Appointments: [{
            Id: 21, Description: "Avtale2", Date: new Date(), Time: 10, Length: 1
        }, {
            Id: 22, Description: "Avtale3", Date: new Date(), Time: 12, Length: 2
        }]
    }
]