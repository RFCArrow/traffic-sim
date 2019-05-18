def calculateMetrics(inputt):
    
    
    '''
    '''
    #import datasets
    import pandas as pd
    import numpy as np 


    outputt = {'saturations': {'sat_car': 0,
                          'sat_bike': 0,
                          'sat_ped': 0,
                          'sat_vehicles': 0.46,
                          'sat_bikes': 0.15,
                          'sat_pedestrian': 0.82},
            'metrics': 
                       {'co2_emissions_kg': 14.19,
                        'pssgr_delay_seconds': 0.0,
                          'average_speed': 28.0}}


    filepath = "/home/traffic-sim/datasets/modal_demand.csv"
    simulationData = pd.read_csv(filepath)

    hello = simulationData[simulationData['Time']== inputt['time']]
    
    conditions = [inputt['road_count'] == 1, inputt['road_count'] == 2, inputt['road_count'] == 3, inputt['road_count'] == 4]
    
    if hello['Buses'].values[0] is not None and hello['LGVs'].values[0] is not None: 
        total_vehicles = hello['Cars'].values[0] + hello['Taxis'].values[0] + hello['Buses'].values[0] + hello['LGVs'].values[0]
    choices = [total_vehicles/ 400, total_vehicles/ 750, total_vehicles/ 1050, total_vehicles/ 1400]
    outputt['saturations']['sat_vehicles'] = round(float(np.select(conditions, choices, default=0)),2)
    
    # this is wrong - needs work
    # hello['sat_bicycle'] = raw_data['dem_cyclist']/1500 # based on swedish guidelines
    outputt['saturations']['sat_bikes'] = round((hello['Cyclists'].values[0]/inputt['flexi_count'])/1500,2) # based on swedish guidelines = 
    
    # hello['sat_bicycle'] = raw_data['dem_cyclist']/1500 # based on swedish guidelines
    outputt['saturations']['sat_pedestrian'] = round(hello['Pedestrians'].values[0]/(1080*inputt['ped_dim']*2),2) #minimum width for comfortable pavement
    
    # calculate emissions from a pre-defined ratio of HGV-to-Bus-to-Car (based on Cheapside data)
    outputt['metrics']['co2_emissions_kg'] = (hello['Cars'].values[0] * 0.05 * 900 + hello['Cars'].values[0] * 0.25 * 70 + hello['Cars'].values[0] * 0.7 * 95)/1000 # HGV + bus + car
    
    # if it's below the capaity, 0, else, delay calculated as a multiple of (60/40=1.5...90seconds) over and above the 0.7 capacity threshold. 
        
    outputt['metrics']['pssgr_delay_seconds'] = float(np.where(outputt['saturations']['sat_vehicles'] < 0.7, 0, ((outputt['saturations']['sat_vehicles'] - 0.7)  * 90) +90))
    
    outputt['metrics']['average_speed'] = float(np.where(outputt['saturations']['sat_vehicles'] < 0.7, 28, 28 - (28*(outputt['saturations']['sat_vehicles'] - 0.7))))

    
    
    return outputt

    
    
    
