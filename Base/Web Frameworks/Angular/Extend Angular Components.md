Angular directives are underused and I think this is because we don't know what they're capable of. If you're using Angular you probably are familiar with the popular structural directives `*ngIf` and `*ngFor`, but does your codebase contain custom directives? The answer to that question is probably no, and it could be that you've resorted to components instead of directives because these are more familiar.

In this blog post, I want to show you a useful technique that uses directives to configure 3rd party components in a unified way. I find this an elegant solution in comparison to creating wrapper components.

Let's take a look at an example.

## [DEFAULT DIRECTIVE](https://timdeschryver.dev/blog/use-angular-directives-to-extend-components-that-you-dont-own#default-directive)

On my current project we're using the component library from PrimeNG and I've seen the following code repeatedly, for every date picker.

📋

`   <p-calendar    [(ngModel)]="date"    required    id="date"    name="date"    dateFormat="dd/mm/yy"    [showIcon]="true"    [showButtonBar]="true"    [monthNavigator]="true"    [yearNavigator]="true"    yearRange="1900:2050"    [firstDayOfWeek]="1"  >  </p-calendar>   `

This is the markup required to configure the component the way we want it to behave. If you ask me this is a lot of code that doesn't only pollute the template but also deceives us into thinking that things are more complex than they are. I can also forget (or I don't know that I have) to add an attribute to a new date picker, and this creates another experience for the user. Lastly, when the component removes, changes, or adds an attribute I could potentially have to change all the `p-datepicker` elements in my codebase. In short, it has an impact on the developers, and on the users.

When we refactor the code by using a directive, the template becomes simple again, and we're sure that we always provide the same experience to the user.

The refactored template looks this.

📋

`   <p-calendar [(ngModel)]="date" required id="date" name="date"></p-calendar>   `

But how do we go from 14 lines of HTML to just one line (this is how prettier formats it)? The answer is a directive.

The directive uses the `p-calender` component selector to be applied to all calendar elements. The `Calendar` instance is injected into the directive and is be configured to our needs.

calendar.directive.ts📋

`   import { Directive } from '@angular/core';  import { Calendar } from 'primeng/calendar';  @Directive({      selector: 'p-calendar',  })  export class CalenderDirective {      constructor(private calendar: Calendar) {          this.calendar.dateFormat = 'dd/mm/yy';          this.calendar.showIcon = true;          this.calendar.showButtonBar = true;          this.calendar.monthNavigator = true;          this.calendar.yearNavigator = true;          this.calendar.yearRange = '1900:2050';          this.calendar.firstDayOfWeek = 1;      }  }   `

### [OVERRIDE THE DEFAULT IMPLEMENTATION](https://timdeschryver.dev/blog/use-angular-directives-to-extend-components-that-you-dont-own#override-the-default-implementation)

The directive provides a solid base that applies to all date picker elements. But for those one-off cases, it's possible to overwrite the predefined values of the directive for elements that require a different configuration.

In the example below, the navigator options are disabled by explicitly setting their values to `false`.

📋

`   <p-calendar [monthNavigator]="false" [yearNavigator]="false"></p-calendar>   `

## [OPT-IN DIRECTIVE](https://timdeschryver.dev/blog/use-angular-directives-to-extend-components-that-you-dont-own#opt-in-directive)

Instead of a directive that changes the behavior of all elements, we modify the selector to target specific elements that have a distinct use case. For example, for dropdown elements that have a generic contract, the dropdown behavior of those "codes-dropdown" elements can be configured. Notice the added attribute `[codes]` of the selector only target codes dropdown elements.

codes.dropdown.ts📋

`   import { Directive, OnInit } from '@angular/core';  import { Dropdown } from 'primeng/dropdown';  import { sortByLabel } from '@core';  @Directive({      selector: 'p-dropdown[codes]',  })  export class CodesDropdownDirective implements OnInit {      constructor(private dropdown: Dropdown) {          this.dropdown.optionLabel = 'label';          this.dropdown.optionValue = 'key';          this.dropdown.showClear = true;      }      public ngOnInit(): void {          this.dropdown.options = [...this.dropdown.options].sort(sortByLabel);          if(this.dropdown.options.length > 10) {              this.dropdown.filter = true;              this.dropdown.filterBy = 'label';              this.dropdown.filterMatchMode = 'startsWith';          }      }  }   `

This way only the `p-dropdown` elements that have the `codes` attribute are configured by the above directive. To use the above directive in the HTML template we need to add the `codes` attribute to the `p-dropdown` element.

📋

`   <p-dropdown [(ngModel)]="favoriteSport" codes required id="sport" name="sport"></p-dropdown>   `

## [OPT-OUT DIRECTIVE](https://timdeschryver.dev/blog/use-angular-directives-to-extend-components-that-you-dont-own#opt-out-directive)

Another option is to use the `:not()` selector for elements that in most of the cases require the same config, but in some rare cases require a one-off configuration. For example, let's say that 90% of the dropdown elements in our application have a data source with "codes". In this case, we don't want to be required to add the `codes` attribute to those directives, instead, we want to define when we don't want to use the directive for the remaining 10%.

Instead of using the `codes` attribute to mark the codes dropdown, we assume that it's the default behavior but use the `resetDropdown` attribute to opt-out of the behavior.

codes.dropdown.ts📋

`   import { Directive, OnInit } from '@angular/core';  import { Dropdown } from 'primeng/dropdown';  import { sortByLabel } from '@core';  @Directive({      selector: 'p-dropdown:not(resetDropdown)',  })  export class CodesDropdownDirective implements OnInit {      constructor(private dropdown: Dropdown) {          this.dropdown.optionLabel = 'label';          this.dropdown.optionValue = 'key';          this.dropdown.showClear = true;      }      public ngOnInit(): void {          this.dropdown.options = [...this.dropdown.options].sort(sortByLabel);          if(this.dropdown.options.length > 10) {              this.dropdown.filter = true;              this.dropdown.filterBy = 'label';              this.dropdown.filterMatchMode = 'startsWith';          }      }  }   `

In the HTML template, this translates to the following.

📋

`   <!-- uses the codes dropdown -->  <p-dropdown [(ngModel)]="favoriteSport" required id="sport" name="sport"></p-dropdown>  <!-- opt-out of the codes dropdown and use the default p-dropdown behavior -->  <p-dropdown    [(ngModel)]="preference"    resetDropdown    required    id="preference"    name="preference"  ></p-dropdown>   `

## [DIRECTIVES THAT LOAD DATA](https://timdeschryver.dev/blog/use-angular-directives-to-extend-components-that-you-dont-own#directives-that-load-data)

We can do more in the directive's implementation. Here we see a directive that populates a dropdown with data, which is useful for data sources that are often used. A variation of this example is to make the data source configurable.

In the example below, we add a `[countries]` attribute so that we can bind the directive to specific dropdowns to use a list of countries as the data source. This directive can be used together with the other dropdown directives. The directive also includes an `@Output` emitter when the countries are loaded.

countries.dropdown.ts📋

`   import { Directive, EventEmitter, OnInit, Output } from '@angular/core';  import { Dropdown } from 'primeng/dropdown';  import { GeoService, sortByLabel } from '@core';  @Directive({      selector: 'p-dropdown[countries]',  })  export class CountriesDropdownDirective implements OnInit {      @Output() loaded = new EventEmitter<ReadonlyArray<Countries>>();      constructor(private dropdown: Dropdown, private geoService: GeoService) {}      public ngOnInit(): void {          this.geoService.getCountries().subscribe((result) => {              this.dropdown.options = result.map((c) => ({ label: c.label, key: c.id })).sort(sortByValue);              this.loaded.emit(this.dropdown.options);          });      }  }   `

📋

`   <p-dropdown    [(ngModel)]="country"    countries    required    id="country"    name="country"    (loaded)="countriesLoaded($event)"  ></p-dropdown>   `

## [CONCLUSION](https://timdeschryver.dev/blog/use-angular-directives-to-extend-components-that-you-dont-own#conclusion)

Angular Directives are great, but sadly underused.