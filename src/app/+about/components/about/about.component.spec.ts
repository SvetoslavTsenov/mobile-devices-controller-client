import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
    let component: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AboutComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AboutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the About title', () => {
        const titleEl = fixture.debugElement.query(By.css('.title')).nativeElement;
        expect(titleEl.innerText).toEqual('about.title');
    });

    it('should render the About description', () => {
        const descriptionEl = fixture.debugElement.query(By.css('.description')).nativeElement;
        expect(descriptionEl.innerText).toEqual('about.description');
    });

});
