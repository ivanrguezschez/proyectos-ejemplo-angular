import { Component, inject } from '@angular/core';
import { SpinnerService } from '@api/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `@if (isLoading()) {
        <div class="overlay">
            <div class="flex items-center justify-center min-h-full text-gray-900">            
                <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
                <div class="ml-8">Loading...</div>
            </div>
        </div>
    }`,
})
export default class SpinnerComponent {
    private readonly _spinnerService = inject(SpinnerService);

    isLoading = this._spinnerService.isLoading;
}