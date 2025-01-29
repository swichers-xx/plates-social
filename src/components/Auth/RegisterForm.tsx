import { TextInput, Button, Stack, Select, MultiSelect, Switch, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useStore } from '../../store/useStore';

export function RegisterForm() {
	const setCurrentUser = useStore(state => state.setCurrentUser);
	
	const form = useForm({
		initialValues: {
			plateNumber: '',
			bio: '',
			vehicle: {
				type: '',
				color: '',
				description: ''
			},
			interests: [] as string[],
			interactionPreferences: {
				social: true,
				romantic: false,
				informational: true
			},
			privacySettings: {
				hidePlate: false,
				anonymize: false,
				contactPermission: 'all' as 'all' | 'mutual' | 'none'
			}
		}
	});

	const handleSubmit = form.onSubmit((values) => {
		setCurrentUser(values);
	});

	return (
		<Box maw={400} mx="auto">
			<form onSubmit={handleSubmit}>
				<Stack spacing="md">
					<TextInput
						required
						label="License Plate"
						placeholder="Enter your plate number"
						{...form.getInputProps('plateNumber')}
					/>
					
					<TextInput
						label="Bio"
						placeholder="Tell us about yourself"
						{...form.getInputProps('bio')}
					/>
					
					<Select
						label="Vehicle Type"
						placeholder="Select vehicle type"
						data={['Sedan', 'SUV', 'Truck', 'Sports Car', 'Other']}
						{...form.getInputProps('vehicle.type')}
					/>
					
					<Select
						label="Vehicle Color"
						placeholder="Select vehicle color"
						data={['Black', 'White', 'Red', 'Blue', 'Silver', 'Other']}
						{...form.getInputProps('vehicle.color')}
					/>
					
					<TextInput
						label="Vehicle Description"
						placeholder="e.g., Tesla Model 3"
						{...form.getInputProps('vehicle.description')}
					/>
					
					<MultiSelect
						label="Interests"
						placeholder="Select your interests"
						data={['Cars', 'Technology', 'Travel', 'Sports', 'Music']}
						{...form.getInputProps('interests')}
					/>
					
					<Switch
						label="Open to Social Interactions"
						{...form.getInputProps('interactionPreferences.social', { type: 'checkbox' })}
					/>
					
					<Switch
						label="Open to Romantic Connections"
						{...form.getInputProps('interactionPreferences.romantic', { type: 'checkbox' })}
					/>
					
					<Select
						label="Contact Permission"
						placeholder="Who can contact you?"
						data={[
							{ value: 'all', label: 'Everyone' },
							{ value: 'mutual', label: 'Mutual Connections' },
							{ value: 'none', label: 'No One' }
						]}
						{...form.getInputProps('privacySettings.contactPermission')}
					/>
					
					<Button type="submit">Register</Button>
				</Stack>
			</form>
		</Box>
	);
}