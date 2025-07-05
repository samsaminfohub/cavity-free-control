
import React, { useState } from 'react';
import { Calendar, Clock, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Planning = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  const appointments = [
    { id: 1, time: '09:00', duration: 30, patient: 'Marie Durand', type: 'Contrôle', status: 'confirmed' },
    { id: 2, time: '09:30', duration: 45, patient: 'Jean Martin', type: 'Détartrage', status: 'confirmed' },
    { id: 3, time: '10:30', duration: 60, patient: 'Sophie Bernard', type: 'Implant', status: 'waiting' },
    { id: 4, time: '11:45', duration: 30, patient: 'Pierre Leroy', type: 'Contrôle', status: 'confirmed' },
    { id: 5, time: '14:00', duration: 90, patient: 'Anne Petit', type: 'Chirurgie', status: 'urgent' },
    { id: 6, time: '15:45', duration: 45, patient: 'Marc Dubois', type: 'Couronne', status: 'confirmed' },
    { id: 7, time: '16:45', duration: 30, patient: 'Claire Moreau', type: 'Suivi', status: 'confirmed' },
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setCurrentDate(newDate);
  };

  const getAppointmentPosition = (time: string, duration: number) => {
    const [hours, minutes] = time.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const dayStart = 8 * 60; // 8:00 AM
    const position = ((startMinutes - dayStart) / 30) * 60; // 60px per 30min slot
    const height = (duration / 30) * 60;
    return { top: position, height };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Planning</h2>
          <p className="text-gray-600">Gérez vos rendez-vous et votre emploi du temps</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau RDV
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigateDate('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {formatDate(currentDate)}
                </h3>
              </div>
              <Button
                variant="outline"
                onClick={() => navigateDate('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'day' ? 'default' : 'outline'}
                onClick={() => setViewMode('day')}
                size="sm"
              >
                Jour
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'outline'}
                onClick={() => setViewMode('week')}
                size="sm"
              >
                Semaine
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Time Schedule */}
        <div className="lg:col-span-3">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Emploi du temps</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Time slots */}
                <div className="space-y-0">
                  {timeSlots.map((time, index) => (
                    <div key={time} className="flex items-center h-15 border-b border-gray-100 last:border-b-0">
                      <div className="w-20 text-sm font-medium text-gray-600 pr-4">
                        {time}
                      </div>
                      <div className="flex-1 h-15 relative bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        {/* Render appointments */}
                        {appointments
                          .filter(apt => apt.time === time)
                          .map(apt => {
                            const { height } = getAppointmentPosition(apt.time, apt.duration);
                            return (
                              <div
                                key={apt.id}
                                className={`absolute left-2 right-2 rounded-lg p-2 text-sm shadow-sm cursor-pointer transition-all hover:shadow-md ${
                                  apt.status === 'confirmed' ? 'bg-blue-500 text-white' :
                                  apt.status === 'waiting' ? 'bg-orange-500 text-white' :
                                  'bg-red-500 text-white'
                                }`}
                                style={{ height: `${height}px`, zIndex: 10 }}
                              >
                                <div className="font-medium truncate">{apt.patient}</div>
                                <div className="text-xs opacity-90 truncate">{apt.type}</div>
                                <div className="text-xs opacity-75">{apt.duration}min</div>
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Summary */}
        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Résumé du jour</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{appointments.length}</div>
                <div className="text-sm text-blue-800">Rendez-vous</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Confirmés</span>
                  <span className="font-medium text-green-600">
                    {appointments.filter(a => a.status === 'confirmed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">En attente</span>
                  <span className="font-medium text-orange-600">
                    {appointments.filter(a => a.status === 'waiting').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Urgents</span>
                  <span className="font-medium text-red-600">
                    {appointments.filter(a => a.status === 'urgent').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Prochains RDV</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {appointments.slice(0, 3).map((apt) => (
                  <div key={apt.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                    <div className="flex-shrink-0">
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {apt.patient}
                      </p>
                      <p className="text-xs text-gray-500">
                        {apt.time} - {apt.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Planning;
