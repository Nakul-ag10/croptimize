import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ThemeToggle } from './ThemeToggle'
import { FieldDetailsModal } from './FieldDetailsModal'
import { motion } from 'motion/react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts'
import { 
  Leaf, 
  LogOut, 
  Home, 
  Thermometer, 
  Droplets, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  MapPin,
  Activity,
  Zap,
  Cloud,
  MousePointer
} from 'lucide-react'

interface DashboardProps {
  onSignOut: () => void
  onNavigateToHomepage: () => void
}

export function Dashboard({ onSignOut, onNavigateToHomepage }: DashboardProps) {
  const [selectedField, setSelectedField] = useState('field-1')
  const [selectedFieldDetails, setSelectedFieldDetails] = useState<any>(null)
  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false)

  // Mock sensor data
  const temperatureData = [
    { time: '00:00', value: 18 },
    { time: '04:00', value: 16 },
    { time: '08:00', value: 22 },
    { time: '12:00', value: 28 },
    { time: '16:00', value: 26 },
    { time: '20:00', value: 21 },
  ]

  const moistureData = [
    { time: '00:00', value: 65 },
    { time: '04:00', value: 68 },
    { time: '08:00', value: 62 },
    { time: '12:00', value: 58 },
    { time: '16:00', value: 55 },
    { time: '20:00', value: 60 },
  ]

  const yieldPrediction = [
    { month: 'Jan', predicted: 4.2, actual: 4.0 },
    { month: 'Feb', predicted: 4.5, actual: 4.3 },
    { month: 'Mar', predicted: 4.8, actual: 4.6 },
    { month: 'Apr', predicted: 5.2, actual: null },
    { month: 'May', predicted: 5.5, actual: null },
    { month: 'Jun', predicted: 5.8, actual: null },
  ]

  const cropHealthData = [
    { 
      id: 'field-a',
      name: 'Wheat Field A', 
      health: 92, 
      area: 25, 
      status: 'Excellent',
      cropType: 'Winter Wheat',
      moisture: 65,
      temperature: 24,
      ph: 6.8,
      nutrients: { nitrogen: 85, phosphorus: 75, potassium: 90 },
      plantingDate: 'October 15, 2024',
      expectedHarvest: 'July 20, 2025',
      yieldPrediction: 5.2,
      pestRisk: 'Low' as const,
      irrigationStatus: 'Active' as const
    },
    { 
      id: 'field-b',
      name: 'Corn Field B', 
      health: 78, 
      area: 30, 
      status: 'Good',
      cropType: 'Sweet Corn',
      moisture: 58,
      temperature: 26,
      ph: 7.0,
      nutrients: { nitrogen: 70, phosphorus: 68, potassium: 75 },
      plantingDate: 'March 10, 2024',
      expectedHarvest: 'August 15, 2024',
      yieldPrediction: 4.8,
      pestRisk: 'Medium' as const,
      irrigationStatus: 'Scheduled' as const
    },
    { 
      id: 'field-c',
      name: 'Soybean Field C', 
      health: 85, 
      area: 20, 
      status: 'Good',
      cropType: 'Soybeans',
      moisture: 62,
      temperature: 23,
      ph: 6.9,
      nutrients: { nitrogen: 80, phosphorus: 72, potassium: 85 },
      plantingDate: 'April 5, 2024',
      expectedHarvest: 'September 30, 2024',
      yieldPrediction: 3.5,
      pestRisk: 'Low' as const,
      irrigationStatus: 'Manual' as const
    },
    { 
      id: 'field-d',
      name: 'Tomato Field D', 
      health: 65, 
      area: 15, 
      status: 'Needs Attention',
      cropType: 'Roma Tomatoes',
      moisture: 55,
      temperature: 28,
      ph: 6.7,
      nutrients: { nitrogen: 60, phosphorus: 55, potassium: 65 },
      plantingDate: 'May 1, 2024',
      expectedHarvest: 'August 30, 2024',
      yieldPrediction: 2.8,
      pestRisk: 'High' as const,
      irrigationStatus: 'Active' as const
    },
  ]

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Low Soil Moisture',
      description: 'Field B moisture level below optimal range',
      time: '2 hours ago',
      field: 'Corn Field B'
    },
    {
      id: 2,
      type: 'info',
      title: 'Weather Alert',
      description: 'Rain expected in next 48 hours',
      time: '4 hours ago',
      field: 'All Fields'
    },
    {
      id: 3,
      type: 'success',
      title: 'Irrigation Complete',
      description: 'Automatic irrigation cycle finished',
      time: '6 hours ago',
      field: 'Wheat Field A'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Pest Detection',
      description: 'Possible pest activity detected',
      time: '1 day ago',
      field: 'Tomato Field D'
    }
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'info': return <Activity className="h-4 w-4 text-blue-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600'
    if (health >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleFieldClick = (field: any) => {
    setSelectedFieldDetails(field)
    setIsFieldModalOpen(true)
  }

  const handleCloseFieldModal = () => {
    setIsFieldModalOpen(false)
    setSelectedFieldDetails(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="logo.png" alt="logo" className='h-10 w-10' />
              <h1 className="text-xl font-semibold">CropTimize</h1>
            </motion.div>
            <nav className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" onClick={onNavigateToHomepage}>
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </motion.div>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Welcome back, John</span>
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" onClick={onSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-6">
        {/* Overview Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 hover:border-green-200 dark:hover:border-green-800 transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Fields</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">4</div>
                <p className="text-xs text-muted-foreground">90 hectares total</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Temperature</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">24°C</div>
                <p className="text-xs text-muted-foreground">+2°C from yesterday</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="bg-gradient-to-br from-cyan-50/50 to-teal-50/50 dark:from-cyan-950/20 dark:to-teal-950/20 border-2 hover:border-cyan-200 dark:hover:border-cyan-800 transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Soil Moisture</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">62%</div>
                <p className="text-xs text-muted-foreground">Optimal range</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20 border-2 hover:border-orange-200 dark:hover:border-orange-800 transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">2</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sensors">Sensor Data</TabsTrigger>
            <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Crop Health Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Crop Health Overview</CardTitle>
                <CardDescription>Current status of all fields</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cropHealthData.map((crop, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-green-200 dark:hover:border-green-800 transition-all duration-300 group bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 dark:hover:from-green-950/20 dark:hover:to-emerald-950/20"
                      onClick={() => handleFieldClick(crop)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-full"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </motion.div>
                        <div>
                          <h4 className="font-medium group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">{crop.name}</h4>
                          <p className="text-sm text-muted-foreground">{crop.area} hectares • {crop.cropType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`text-lg font-semibold ${getHealthColor(crop.health)}`}>
                            {crop.health}%
                          </div>
                          <Badge variant={crop.health >= 90 ? 'default' : crop.health >= 70 ? 'secondary' : 'destructive'}>
                            {crop.status}
                          </Badge>
                        </div>
                        <Progress value={crop.health} className="w-20" />
                        <MousePointer className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Weather Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Cloud className="h-8 w-8 text-blue-500" />
                    <div>
                      <div className="font-semibold">Partly Cloudy</div>
                      <div className="text-sm text-muted-foreground">Rain expected tomorrow</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Irrigation Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Droplets className="h-8 w-8 text-blue-500" />
                    <div>
                      <div className="font-semibold">2 Fields Active</div>
                      <div className="text-sm text-muted-foreground">Next cycle: 6:00 AM</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Energy Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Zap className="h-8 w-8 text-yellow-500" />
                    <div>
                      <div className="font-semibold">245 kWh</div>
                      <div className="text-sm text-muted-foreground">-12% from last week</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sensors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Temperature Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Temperature (24h)</CardTitle>
                  <CardDescription>Real-time temperature monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={temperatureData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Moisture Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Soil Moisture (24h)</CardTitle>
                  <CardDescription>Soil moisture levels across fields</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={moistureData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Sensor Status Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Sensor Status</CardTitle>
                <CardDescription>Live status of all field sensors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Field A - Sensor 1', status: 'Online', battery: 85, type: 'Soil Monitor' },
                    { name: 'Field A - Sensor 2', status: 'Online', battery: 92, type: 'Weather Station' },
                    { name: 'Field B - Sensor 1', status: 'Offline', battery: 12, type: 'Soil Monitor' },
                    { name: 'Field B - Sensor 2', status: 'Online', battery: 76, type: 'Irrigation Control' },
                  ].map((sensor, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={sensor.status === 'Online' ? 'default' : 'destructive'}>
                          {sensor.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{sensor.battery}%</span>
                      </div>
                      <h4 className="font-medium text-sm">{sensor.name}</h4>
                      <p className="text-xs text-muted-foreground">{sensor.type}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            {/* Yield Prediction Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Yield Predictions vs Actual</CardTitle>
                <CardDescription>AI-powered yield forecasting for the growing season</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={yieldPrediction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="predicted" fill="#3b82f6" name="Predicted (tons/hectare)" />
                    <Bar dataKey="actual" fill="#10b981" name="Actual (tons/hectare)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Growth Stage Predictions</CardTitle>
                  <CardDescription>Estimated crop development timeline</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { crop: 'Wheat Field A', stage: 'Flowering', days: 15, confidence: 92, fieldId: 'field-a' },
                    { crop: 'Corn Field B', stage: 'Grain Filling', days: 25, confidence: 88, fieldId: 'field-b' },
                    { crop: 'Soybean Field C', stage: 'Pod Development', days: 20, confidence: 90, fieldId: 'field-c' },
                    { crop: 'Tomato Field D', stage: 'Fruit Setting', days: 10, confidence: 85, fieldId: 'field-d' },
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 dark:hover:from-blue-950/20 dark:hover:to-cyan-950/20"
                      onClick={() => {
                        const field = cropHealthData.find(f => f.id === item.fieldId)
                        if (field) handleFieldClick(field)
                      }}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div>
                        <h4 className="font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">{item.crop}</h4>
                        <p className="text-sm text-muted-foreground">Next: {item.stage}</p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <div>
                          <div className="font-semibold">{item.days} days</div>
                          <div className="text-sm text-muted-foreground">{item.confidence}% confidence</div>
                        </div>
                        <MousePointer className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                  <CardDescription>AI-detected potential risks and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { risk: 'Pest Infestation', level: 'Medium', field: 'Tomato Field D', action: 'Schedule inspection', fieldId: 'field-d' },
                    { risk: 'Water Stress', level: 'Low', field: 'Corn Field B', action: 'Monitor moisture', fieldId: 'field-b' },
                    { risk: 'Disease Risk', level: 'High', field: 'Wheat Field A', action: 'Apply fungicide', fieldId: 'field-a' },
                    { risk: 'Nutrient Deficiency', level: 'Medium', field: 'Soybean Field C', action: 'Soil test recommended', fieldId: 'field-c' },
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:border-orange-200 dark:hover:border-orange-800 transition-all duration-300 group bg-gradient-to-r hover:from-orange-50/50 hover:to-amber-50/50 dark:hover:from-orange-950/20 dark:hover:to-amber-950/20"
                      onClick={() => {
                        const field = cropHealthData.find(f => f.id === item.fieldId)
                        if (field) handleFieldClick(field)
                      }}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div>
                        <h4 className="font-medium group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">{item.risk}</h4>
                        <p className="text-sm text-muted-foreground">{item.field}</p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <div>
                          <Badge variant={item.level === 'High' ? 'destructive' : item.level === 'Medium' ? 'secondary' : 'default'}>
                            {item.level}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{item.action}</p>
                        </div>
                        <MousePointer className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>System notifications and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="mt-0.5">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{alert.title}</h4>
                          <span className="text-sm text-muted-foreground">{alert.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {alert.field}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Field Details Modal */}
      <FieldDetailsModal
        field={selectedFieldDetails}
        isOpen={isFieldModalOpen}
        onClose={handleCloseFieldModal}
      />
    </div>
  )
}